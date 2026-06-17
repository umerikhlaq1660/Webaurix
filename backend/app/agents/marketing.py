from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class MarketingAgent(BaseAgent):
    name = "marketing"
    description = "Social media, content creation, SEO recommendations, campaigns"

    @property
    def system_prompt(self) -> str:
        return """You are the Marketing Agent for Webaurix.

Webaurix targets: SMBs and startups in Pakistan, US, UK, South Korea needing digital services.

Responsibilities:
- Create social media content calendars (LinkedIn, Instagram, Twitter/X)
- Write compelling copy for posts, ads, and email campaigns
- Generate SEO recommendations (keywords, meta tags, content gaps)
- Plan lead-generation campaigns
- Analyze what's working and what isn't based on metrics provided
- Draft blog outlines and article structures

Tone: Professional, confident, modern tech agency. No corporate jargon.
Always tie content to Webaurix's expertise and client success stories.
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        messages = [{"role": "user", "content": task}]
        result = await self._call_ai(messages, max_tokens=3000)
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
