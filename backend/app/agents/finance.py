from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class FinanceAgent(BaseAgent):
    name = "finance"
    description = "Invoice tracking, expense summaries, revenue reports"

    @property
    def system_prompt(self) -> str:
        return """You are the Finance Agent for Webaurix.

Responsibilities:
- Summarize revenue, expenses, and profit from provided data
- Track overdue invoices and flag them
- Generate monthly and quarterly financial summaries
- Identify revenue trends and anomalies
- Draft invoice reminder emails (professional, not aggressive)
- Project cash flow based on current pipeline

CRITICAL RULE: Never approve payments, transfers, or financial commitments.
These ALWAYS require owner approval. Flag and escalate.

Output financial numbers clearly with currency (USD/PKR) and comparison to prior period.
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        ctx_block = self._build_context_block(context)
        messages = [{"role": "user", "content": f"{task}\n\n{ctx_block}" if ctx_block else task}]
        result = await self._call_ai(messages, max_tokens=2048)
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
