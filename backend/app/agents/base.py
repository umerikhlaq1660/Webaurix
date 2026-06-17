"""
BaseAgent — every specialized agent inherits from this.
Each agent has its own system prompt, tools, and execute() method.
The orchestrator calls agent.execute(task) and gets back a structured result.
"""
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.ai_client import chat
from app.services.memory import MemoryService


@dataclass
class AgentResult:
    agent: str
    response: str
    actions_taken: list[dict] = field(default_factory=list)
    tasks_created: list[dict] = field(default_factory=list)
    data: dict[str, Any] = field(default_factory=dict)
    tokens_used: int = 0


class BaseAgent(ABC):
    name: str = "base"
    description: str = ""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.memory = MemoryService(db)

    @property
    @abstractmethod
    def system_prompt(self) -> str:
        """The system prompt that defines this agent's persona and capabilities."""
        ...

    @property
    def tools(self) -> list[dict]:
        """Claude tool definitions available to this agent. Override to add tools."""
        return []

    @abstractmethod
    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        """
        Execute a task and return a structured result.
        context includes: client_info, project_info, history, memories, etc.
        """
        ...

    async def _call_ai(
        self,
        messages: list[dict],
        max_tokens: int = 2048,
    ) -> dict[str, Any]:
        return await chat(
            messages=messages,
            system=self.system_prompt,
            tools=self.tools or None,
            max_tokens=max_tokens,
        )

    def _build_context_block(self, context: dict) -> str:
        """Serialize context dict into a readable block for the AI."""
        parts = []
        if context.get("memories"):
            parts.append("=== RELEVANT MEMORY ===")
            for m in context["memories"]:
                parts.append(f"• [{m['memory_type']}] {m['content']}")
        if context.get("client"):
            c = context["client"]
            parts.append(f"=== CLIENT ===\n{c.get('name')} | {c.get('email')} | {c.get('status')}")
        if context.get("project"):
            p = context["project"]
            parts.append(f"=== PROJECT ===\n{p.get('name')} | status: {p.get('status')} | deadline: {p.get('deadline')}")
        if context.get("recent_tasks"):
            parts.append("=== RECENT TASKS ===")
            for t in context["recent_tasks"][:5]:
                parts.append(f"• [{t['status']}] {t['title']} — {t.get('assigned_agent', '?')}")
        return "\n".join(parts)
