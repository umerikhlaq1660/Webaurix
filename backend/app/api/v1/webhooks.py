"""
Webhook handlers for Gmail (Pub/Sub push) and WhatsApp Business API.
Both routes are PUBLIC — they receive events from external services.
"""
from __future__ import annotations
import uuid
from fastapi import APIRouter, Request, Response, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.config import get_settings
from app.agents.orchestrator import ARIAOrchestrator
from app.services.whatsapp import WhatsAppService
from app.core.database import AsyncSessionLocal

settings = get_settings()
router = APIRouter(prefix="/webhooks", tags=["webhooks"])


# ── WhatsApp Webhook ─────────────────────────────────────────────────────────
@router.get("/whatsapp")
async def whatsapp_verify(request: Request):
    """Meta requires a GET verification handshake when setting up the webhook."""
    params = request.query_params
    if (
        params.get("hub.mode") == "subscribe"
        and params.get("hub.verify_token") == settings.whatsapp_verify_token
    ):
        return Response(content=params.get("hub.challenge", ""), media_type="text/plain")
    raise HTTPException(status_code=403, detail="Verification failed")


@router.post("/whatsapp")
async def whatsapp_inbound(request: Request):
    """Receive inbound WhatsApp messages and route to ARIA."""
    payload = await request.json()
    wa = WhatsAppService()
    msg = wa.parse_inbound(payload)
    if not msg or not msg.get("text"):
        return {"status": "ignored"}

    async with AsyncSessionLocal() as db:
        orchestrator = ARIAOrchestrator(db)
        session_id = f"wa_{msg['from']}"
        result = await orchestrator.process(
            message=msg["text"],
            session_id=session_id,
            channel="whatsapp",
        )
        await wa.send_text(msg["from"], result["response"])

    return {"status": "ok"}


# ── Gmail Push Notifications ─────────────────────────────────────────────────
@router.post("/gmail")
async def gmail_inbound(request: Request):
    """
    Receive Gmail Pub/Sub push notifications.
    When a new email arrives, summarize it and store in email_log.
    If it looks like a client inquiry, trigger a response draft.
    """
    import base64, json as _json
    body = await request.json()
    try:
        encoded = body["message"]["data"]
        data = _json.loads(base64.urlsafe_b64decode(encoded + "=="))
    except (KeyError, Exception):
        return {"status": "ignored"}

    # Minimal processing — log the event; full email reading done by Celery task
    async with AsyncSessionLocal() as db:
        await db.execute(
            text("""
                INSERT INTO email_log (direction, from_addr, to_addr, subject, gmail_id)
                VALUES ('inbound', :from_addr, :to_addr, :subject, :gmail_id)
            """),
            {
                "from_addr": data.get("emailAddress", ""),
                "to_addr": settings.gmail_sender_email,
                "subject": data.get("subject", "New email"),
                "gmail_id": data.get("messageId", str(uuid.uuid4())),
            },
        )
        await db.commit()

    return {"status": "queued"}
