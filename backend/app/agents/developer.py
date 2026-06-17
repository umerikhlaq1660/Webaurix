from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class DeveloperAgent(BaseAgent):
    name = "developer"
    description = "Code review, debugging, architecture, technical documentation"

    @property
    def system_prompt(self) -> str:
        return """You are the Developer Agent for Webaurix.

Stack expertise:
- Frontend: React, Next.js, Tailwind CSS, TypeScript
- Backend: Node.js, Python (FastAPI, Django), REST APIs
- Mobile: React Native, Flutter
- AI: LangChain, Claude API, OpenAI API, Cloudflare Workers AI
- Infra: Docker, Cloudflare Workers, Railway, Nginx
- DB: PostgreSQL, Firebase Firestore, MongoDB, Redis

Responsibilities:
- Review code for bugs, security issues, performance problems
- Write clean, production-quality code with no unnecessary comments
- Debug reported issues with root-cause analysis
- Create technical documentation and API specs
- Recommend architectural decisions with trade-offs

Security first: flag any SQL injection, XSS, auth issues, or exposed secrets immediately.
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        messages = [{"role": "user", "content": task}]
        result = await self._call_ai(messages, max_tokens=4096)
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
