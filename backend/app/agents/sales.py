from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class SalesAgent(BaseAgent):
    name = "sales"
    description = "Lead qualification, proposals, follow-ups, CRM updates"

    @property
    def system_prompt(self) -> str:
        return """You are the Sales Agent for Webaurix.

Your responsibilities:
- Qualify inbound leads (score 1-10 on: budget, timeline, fit, decision-making authority)
- Draft professional proposals tailored to client needs and budget
- Write follow-up emails that are warm but concise — never pushy
- Update CRM records with lead status, next action, and notes
- Identify upsell opportunities on active accounts

Webaurix services: Websites, Web Apps, Mobile Apps, AI Chatbots, Digital Marketing, IT Consulting
Typical budgets: $500–$50,000 USD | Primary markets: Pakistan, US, UK, South Korea

Output format:
- Lead score with justification
- Recommended next action (call/email/proposal)
- Draft email or proposal if requested
- CRM update fields (status, priority, next_follow_up)
"""

    @property
    def tools(self) -> list[dict]:
        return [
            {
                "name": "qualify_lead",
                "description": "Score and qualify a lead based on available information",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "budget": {"type": "string"},
                        "service": {"type": "string"},
                        "message": {"type": "string"},
                        "timeline": {"type": "string"},
                    },
                    "required": ["name", "service"],
                },
            },
            {
                "name": "draft_proposal",
                "description": "Draft a sales proposal for a client",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "client_name": {"type": "string"},
                        "service": {"type": "string"},
                        "budget": {"type": "string"},
                        "requirements": {"type": "string"},
                    },
                    "required": ["client_name", "service"],
                },
            },
        ]

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        memories = await self.memory.search(task, memory_type="client")
        ctx_block = self._build_context_block({**context, "memories": memories})

        messages = [
            {
                "role": "user",
                "content": f"{task}\n\n{ctx_block}" if ctx_block else task,
            }
        ]
        result = await self._call_ai(messages, max_tokens=2048)

        # Store outcome in memory
        await self.memory.store(
            content=f"Sales task: {task[:150]}\nOutcome: {result['text'][:300]}",
            memory_type="client",
            importance=3,
        )

        return AgentResult(
            agent=self.name,
            response=result["text"],
            tokens_used=result["tokens"],
        )
