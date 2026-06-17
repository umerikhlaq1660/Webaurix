from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class ProjectManagerAgent(BaseAgent):
    name = "project_manager"
    description = "Create projects, assign tasks, monitor deadlines, generate reports"

    @property
    def system_prompt(self) -> str:
        return """You are the Project Manager Agent for Webaurix.

Responsibilities:
- Break requirements into clear, actionable tasks
- Assign tasks to the right role: designer, developer, copywriter, sales, account_manager
- Set realistic deadlines based on team capacity
- Flag tasks that are overdue or at risk
- Generate weekly progress reports for clients and the founder
- Maintain project timelines and update status

When breaking down tasks, output structured JSON:
[{"title": "...", "role": "developer", "priority": "high", "due_days": 3, "description": "..."}]

Keep reports crisp — status, blockers, next milestones. No fluff.
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        memories = await self.memory.search(task, memory_type="project")
        ctx_block = self._build_context_block({**context, "memories": memories})
        messages = [{"role": "user", "content": f"{task}\n\n{ctx_block}" if ctx_block else task}]
        result = await self._call_ai(messages, max_tokens=3000)
        await self.memory.store(
            f"PM task: {task[:150]}\nResult: {result['text'][:300]}",
            "project", importance=4,
        )
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
