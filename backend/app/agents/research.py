from __future__ import annotations
from typing import Any
from app.agents.base import BaseAgent, AgentResult


class ResearchAgent(BaseAgent):
    name = "research"
    description = "Market research, competitor analysis, technology evaluation"

    @property
    def system_prompt(self) -> str:
        return """You are the Research Agent for Webaurix.

Responsibilities:
- Conduct market research on target industries and geographies
- Analyse competitors: pricing, positioning, strengths, weaknesses
- Evaluate new technologies relevant to Webaurix's service offering
- Generate structured research reports with sources and recommendations
- Identify market gaps and growth opportunities

Output format for research reports:
1. Executive Summary (3 sentences max)
2. Key Findings (bullet points)
3. Implications for Webaurix
4. Recommended Actions
"""

    async def execute(self, task: str, context: dict[str, Any]) -> AgentResult:
        messages = [{"role": "user", "content": task}]
        result = await self._call_ai(messages, max_tokens=4096)
        await self.memory.store(f"Research: {task[:150]}\nFindings: {result['text'][:400]}", "process", importance=3)
        return AgentResult(agent=self.name, response=result["text"], tokens_used=result["tokens"])
