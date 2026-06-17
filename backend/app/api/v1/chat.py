"""
Chat API — WebSocket for real-time voice/text, REST for standard requests.
This is the primary interface between the frontend dashboard and ARIA.
"""
from __future__ import annotations
import json
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.database import get_db
from app.core.security import get_current_user
from app.agents.orchestrator import ARIAOrchestrator

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None
    channel: str = "web"
    context: dict | None = None   # live business data from frontend


class ChatResponse(BaseModel):
    response: str
    session_id: str
    agent_results: list[dict] = []
    actions_taken: list[dict] = []
    tokens_used: int = 0


@router.post("", response_model=ChatResponse)
async def send_message(
    req: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    session_id = req.session_id or str(uuid.uuid4())

    # Load conversation history
    history_rows = await db.execute(
        text("""
            SELECT m.role, m.content
            FROM messages m
            JOIN conversations c ON c.id = m.conversation_id
            WHERE c.session_id = :session_id
            ORDER BY m.created_at ASC
            LIMIT 20
        """),
        {"session_id": session_id},
    )
    history = [{"role": r.role, "content": r.content} for r in history_rows]

    # Ensure conversation record exists
    await db.execute(
        text("""
            INSERT INTO conversations (session_id, user_id, channel)
            VALUES (:sid, :uid, :ch)
            ON CONFLICT (session_id) DO NOTHING
        """),
        {"sid": session_id, "uid": current_user["id"], "ch": req.channel},
    )

    # Run ARIA
    orchestrator = ARIAOrchestrator(db)
    result = await orchestrator.process(
        message=req.message,
        session_id=session_id,
        channel=req.channel,
        conversation_history=history,
        client_context=req.context,
    )

    # Persist messages
    conv_row = await db.execute(
        text("SELECT id FROM conversations WHERE session_id = :sid"),
        {"sid": session_id},
    )
    conv_id = conv_row.scalar_one()

    await db.execute(
        text("""
            INSERT INTO messages (conversation_id, role, content, tokens_used)
            VALUES (:cid, 'user', :content, 0),
                   (:cid, 'assistant', :reply, :tokens)
        """),
        {"cid": conv_id, "content": req.message, "reply": result["response"], "tokens": result["tokens_used"]},
    )
    await db.commit()

    return ChatResponse(
        response=result["response"],
        session_id=session_id,
        agent_results=result["agent_results"],
        actions_taken=result["actions_taken"],
        tokens_used=result["tokens_used"],
    )


@router.get("/history/{session_id}")
async def get_history(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    rows = await db.execute(
        text("""
            SELECT m.role, m.content, m.agent_name, m.created_at
            FROM messages m
            JOIN conversations c ON c.id = m.conversation_id
            WHERE c.session_id = :sid
            ORDER BY m.created_at ASC
        """),
        {"sid": session_id},
    )
    return [dict(r._mapping) for r in rows]


@router.get("/sessions")
async def list_sessions(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    rows = await db.execute(
        text("""
            SELECT c.session_id, c.channel, c.created_at,
                   COUNT(m.id) AS message_count,
                   MAX(m.created_at) AS last_message_at
            FROM conversations c
            LEFT JOIN messages m ON m.conversation_id = c.id
            WHERE c.user_id = :uid
            GROUP BY c.session_id, c.channel, c.created_at
            ORDER BY last_message_at DESC NULLS LAST
            LIMIT 50
        """),
        {"uid": current_user["id"]},
    )
    return [dict(r._mapping) for r in rows]


# ── WebSocket for real-time voice/streaming ──────────────────────────────────
@router.websocket("/ws/{session_id}")
async def websocket_chat(
    websocket: WebSocket,
    session_id: str,
    db: AsyncSession = Depends(get_db),
):
    await websocket.accept()
    orchestrator = ARIAOrchestrator(db)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            message = payload.get("message", "")
            if not message.strip():
                continue

            result = await orchestrator.process(
                message=message,
                session_id=session_id,
                channel="voice",
                client_context=payload.get("context"),
            )
            await websocket.send_json({
                "response": result["response"],
                "actions_taken": result["actions_taken"],
                "tokens_used": result["tokens_used"],
            })
    except WebSocketDisconnect:
        pass
