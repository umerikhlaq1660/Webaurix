"""
Vector memory service — stores and retrieves semantic memories using pgvector.
Every significant ARIA decision, client detail, and meeting is stored here
so ARIA remembers context across sessions without re-reading all history.
"""
from __future__ import annotations
import json
from uuid import UUID
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.ai_client import get_embedding
from app.core.config import get_settings

settings = get_settings()


class MemoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def store(
        self,
        content: str,
        memory_type: str,
        entity_type: str | None = None,
        entity_id: UUID | None = None,
        importance: int = 3,
        metadata: dict | None = None,
    ) -> None:
        embedding = await get_embedding(content)
        await self.db.execute(
            text("""
                INSERT INTO memories (content, embedding, memory_type, entity_type, entity_id, importance, metadata)
                VALUES (:content, :embedding, :memory_type, :entity_type, :entity_id, :importance, :metadata)
            """),
            {
                "content": content,
                "embedding": str(embedding),
                "memory_type": memory_type,
                "entity_type": entity_type,
                "entity_id": str(entity_id) if entity_id else None,
                "importance": importance,
                "metadata": json.dumps(metadata or {}),
            },
        )
        await self.db.commit()

    async def search(
        self,
        query: str,
        top_k: int | None = None,
        memory_type: str | None = None,
        entity_id: UUID | None = None,
    ) -> list[dict]:
        """
        Cosine similarity search over memories.
        Returns ranked list of { content, memory_type, score, metadata }.
        """
        k = top_k or settings.memory_top_k
        query_embedding = await get_embedding(query)

        filters = []
        params: dict = {"embedding": str(query_embedding), "k": k}

        if memory_type:
            filters.append("memory_type = :memory_type")
            params["memory_type"] = memory_type
        if entity_id:
            filters.append("entity_id = :entity_id")
            params["entity_id"] = str(entity_id)

        where_clause = f"WHERE {' AND '.join(filters)}" if filters else ""

        result = await self.db.execute(
            text(f"""
                SELECT content, memory_type, entity_type, metadata,
                       1 - (embedding <=> :embedding::vector) AS score
                FROM memories
                {where_clause}
                ORDER BY embedding <=> :embedding::vector
                LIMIT :k
            """),
            params,
        )
        rows = result.mappings().all()
        return [dict(r) for r in rows]

    async def store_client(self, client: dict) -> None:
        content = (
            f"Client: {client.get('name')} | Email: {client.get('email')} | "
            f"Company: {client.get('company')} | Country: {client.get('country')} | "
            f"Services: {client.get('services')} | Status: {client.get('status')} | "
            f"Notes: {client.get('notes', '')}"
        )
        await self.store(content, "client", "client", client.get("id"), importance=4)

    async def store_decision(self, decision: str, context: str) -> None:
        content = f"Decision: {decision}\nContext: {context}\nDate: {datetime.utcnow().date()}"
        await self.store(content, "decision", importance=5)

    async def store_meeting_summary(self, meeting: dict) -> None:
        content = (
            f"Meeting: {meeting.get('title')} | Date: {meeting.get('scheduled_at')} | "
            f"Client: {meeting.get('client_name')} | Summary: {meeting.get('summary')} | "
            f"Action items: {meeting.get('action_items')}"
        )
        await self.store(content, "meeting", "meeting", meeting.get("id"), importance=4)
