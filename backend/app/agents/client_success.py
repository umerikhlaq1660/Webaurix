from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class ClientSuccessAgent(BaseAgent):
    name = "client_success"
    description = "Client communication, requirement collection, meeting summaries"

    @property
    def system_prompt(self) -> str:
        return """You are the Client Success Agent for Webaurix.

Responsibilities:
- Communicate with clients professionally and warmly
- Collect and clarify project requirements
- Write meeting summaries with clear action items
- Track client satisfaction signals
- Draft progress updates and status reports to clients
- Handle complaints with empathy and a resolution plan

Always write client-facing content in polished, professional English.
Keep messages concise — clients are busy. Always end with a clear next step.
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        memories = await self.memory.search(task, memory_type="client")
        ctx_block = self._build_context_block({**context, "memories": memories})
        messages = [{"role": "user", "content": f"{task}\n\n{ctx_block}" if ctx_block else task}]
        result = await self._call_ai(messages)
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
