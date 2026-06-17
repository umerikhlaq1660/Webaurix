"""
ARIA Orchestrator — the brain of the platform.

Receives every inbound message (web, email, WhatsApp, voice), retrieves
relevant memory, decides which agent(s) to delegate to via Claude tool-calling,
executes the agent(s), and assembles a final response to the founder.
"""
from __future__ import annotations
import json
from typing import Any
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.services.ai_client import chat
from app.services.memory import MemoryService
from app.core.config import get_settings
from app.agents.base import AgentResult
from app.agents.sales import SalesAgent
from app.agents.client_success import ClientSuccessAgent
from app.agents.project_manager import ProjectManagerAgent
from app.agents.developer import DeveloperAgent
from app.agents.marketing import MarketingAgent
from app.agents.research import ResearchAgent
from app.agents.finance import FinanceAgent

settings = get_settings()

ORCHESTRATOR_SYSTEM = f"""You are ARIA, AI Chief of Staff at {settings.company_name} — a full-service digital agency in Lahore, Pakistan specializing in websites, web apps, mobile apps, AI solutions, digital marketing, and IT consulting for clients in Pakistan, US, UK, and South Korea.

You report directly to the founder. ALWAYS address him as "Sir". Be decisive, brief, and professional — a high-caliber Chief of Staff, not a chatbot.

CORE RULES:
- Language: English ONLY.
- Address founder as "Sir" in every reply.
- Never say "I don't have access" — use the live data and memories provided. If genuinely empty, say "No data yet, Sir."
- Never suggest building tools or systems — you ARE the system.
- No filler: "Great question", "Certainly", "Of course" are banned.
- For client data: state exact counts, names, budgets, dates from live context.
- For decisions: one clear recommendation + brief reason. No options lists.
- For critical actions (payments, contracts, hiring): flag for owner approval, do not proceed.

DELEGATION: You have specialized agents you can call via tools. Always delegate domain work to the right agent rather than handling everything yourself. You orchestrate — they execute.

MEMORY: Relevant memories are provided in each message. Use them to maintain continuity across sessions.
"""

# ── Tool definitions for agent delegation ───────────────────────────────────
AGENT_TOOLS: list[dict] = [
    {
        "name": "delegate_to_sales",
        "description": "Delegate to Sales Agent for: lead qualification, proposal drafting, follow-up emails, CRM updates, pipeline management.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string", "description": "Specific task for the sales agent"},
                "client_email": {"type": "string", "description": "Client email if applicable"},
                "urgency": {"type": "string", "enum": ["low", "medium", "high"]},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_client_success",
        "description": "Delegate to Client Success Agent for: client communication, requirement collection, meeting summaries, satisfaction tracking.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "client_email": {"type": "string"},
                "channel": {"type": "string", "enum": ["email", "whatsapp", "internal"]},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_project_manager",
        "description": "Delegate to Project Manager Agent for: creating projects, assigning tasks, monitoring deadlines, generating progress reports.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "project_id": {"type": "string"},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_developer",
        "description": "Delegate to Developer Agent for: code review, debugging, technical documentation, architecture decisions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "language": {"type": "string"},
                "repo_context": {"type": "string"},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_marketing",
        "description": "Delegate to Marketing Agent for: social media plans, content creation, SEO recommendations, campaign ideas.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "platform": {"type": "string"},
                "target_audience": {"type": "string"},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_research",
        "description": "Delegate to Research Agent for: market research, competitor analysis, technology evaluation, trend reports.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "research_type": {"type": "string", "enum": ["market", "competitor", "technology", "general"]},
            },
            "required": ["task"],
        },
    },
    {
        "name": "delegate_to_finance",
        "description": "Delegate to Finance Agent for: invoice tracking, expense summaries, revenue reports, financial projections.",
        "input_schema": {
            "type": "object",
            "properties": {
                "task": {"type": "string"},
                "period": {"type": "string"},
            },
            "required": ["task"],
        },
    },
    {
        "name": "schedule_meeting",
        "description": "Schedule a meeting and send a calendar invite + email to the client.",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "client_email": {"type": "string"},
                "proposed_times": {"type": "array", "items": {"type": "string"}},
                "duration_minutes": {"type": "integer", "default": 60},
                "description": {"type": "string"},
            },
            "required": ["title", "client_email", "proposed_times"],
        },
    },
    {
        "name": "send_email",
        "description": "Send an email to a client or contact via Gmail.",
        "input_schema": {
            "type": "object",
            "properties": {
                "to": {"type": "string"},
                "subject": {"type": "string"},
                "body": {"type": "string"},
                "to_name": {"type": "string"},
            },
            "required": ["to", "subject", "body"],
        },
    },
    {
        "name": "create_approval_request",
        "description": "Flag a critical action for owner approval before proceeding. Use for payments, contracts, hiring, deletions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "action_type": {"type": "string"},
                "description": {"type": "string"},
                "payload": {"type": "object"},
            },
            "required": ["action_type", "description", "payload"],
        },
    },
]

# ── Agent registry ───────────────────────────────────────────────────────────
AGENT_MAP = {
    "delegate_to_sales": SalesAgent,
    "delegate_to_client_success": ClientSuccessAgent,
    "delegate_to_project_manager": ProjectManagerAgent,
    "delegate_to_developer": DeveloperAgent,
    "delegate_to_marketing": MarketingAgent,
    "delegate_to_research": ResearchAgent,
    "delegate_to_finance": FinanceAgent,
}


class ARIAOrchestrator:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.memory = MemoryService(db)

    async def process(
        self,
        message: str,
        session_id: str,
        channel: str = "web",
        conversation_history: list[dict] | None = None,
        client_context: dict | None = None,
    ) -> dict[str, Any]:
        """
        Main entry point. Returns:
        { response, agent_results, actions_taken, tokens_used }
        """
        # 1. Retrieve relevant memories
        memories = await self.memory.search(message, top_k=settings.memory_top_k)
        memory_block = self._format_memories(memories)

        # 2. Build live data block (passed from frontend/API layer)
        data_block = self._format_context(client_context or {})

        # 3. Build messages
        history = (conversation_history or [])[-settings.max_history_messages:]
        system_with_context = (
            ORCHESTRATOR_SYSTEM
            + (f"\n\n=== RETRIEVED MEMORIES ===\n{memory_block}" if memory_block else "")
            + (f"\n\n=== LIVE BUSINESS DATA ===\n{data_block}" if data_block else "")
        )

        messages = history + [{"role": "user", "content": message}]

        # 4. First AI turn — ARIA decides what to do
        ai_resp = await chat(
            messages=messages,
            system=system_with_context,
            tools=AGENT_TOOLS,
            max_tokens=4096,
        )

        total_tokens = ai_resp["tokens"]
        agent_results: list[AgentResult] = []
        actions_taken: list[dict] = []

        # 5. Execute any tool calls (agent delegation)
        if ai_resp.get("tool_use"):
            tool_results = []
            for tool_call in ai_resp["tool_use"]:
                result = await self._execute_tool(tool_call, client_context or {})
                agent_results.append(result) if isinstance(result, AgentResult) else None
                actions_taken.append({"tool": tool_call["name"], "input": tool_call["input"]})
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": tool_call["id"],
                    "content": result.response if isinstance(result, AgentResult) else str(result),
                })

            # 6. Second AI turn — ARIA synthesizes agent results into final response
            follow_up_messages = messages + [
                {"role": "assistant", "content": ai_resp.get("text", "") or "Delegating now, Sir."},
                {"role": "user", "content": tool_results},
            ]
            final_resp = await chat(
                messages=follow_up_messages,
                system=system_with_context,
                max_tokens=2048,
            )
            total_tokens += final_resp["tokens"]
            final_text = final_resp["text"]
        else:
            final_text = ai_resp["text"]

        # 7. Store this interaction in memory
        await self.memory.store(
            content=f"User: {message[:200]}\nARIA: {final_text[:400]}",
            memory_type="conversation",
            importance=2,
            metadata={"session_id": session_id, "channel": channel},
        )

        return {
            "response": final_text,
            "agent_results": [
                {"agent": r.agent, "response": r.response, "data": r.data}
                for r in agent_results
            ],
            "actions_taken": actions_taken,
            "tokens_used": total_tokens,
        }

    async def _execute_tool(self, tool_call: dict, context: dict) -> AgentResult | dict:
        name = tool_call["name"]
        inputs = tool_call["input"]

        if name in AGENT_MAP:
            agent = AGENT_MAP[name](self.db)
            return await agent.execute(inputs.get("task", ""), context | inputs)

        if name == "schedule_meeting":
            return await self._handle_schedule_meeting(inputs)

        if name == "send_email":
            return await self._handle_send_email(inputs)

        if name == "create_approval_request":
            return await self._handle_approval(inputs)

        return AgentResult(agent=name, response=f"Tool {name} executed.")

    async def _handle_schedule_meeting(self, inputs: dict) -> AgentResult:
        from app.services.calendar import CalendarService
        from app.services.gmail import GmailService
        svc = CalendarService()
        gmail = GmailService()
        times_str = ", ".join(inputs["proposed_times"])
        body = (
            f"Dear Sir/Madam,\n\nI'd like to schedule a meeting: {inputs['title']}.\n"
            f"Proposed times: {times_str}\n\nPlease confirm your preferred slot.\n\nBest,\nWebaurix Team"
        )
        await gmail.send(
            to=inputs["client_email"],
            subject=f"Meeting Request — {inputs['title']}",
            body=body,
        )
        return AgentResult(
            agent="scheduler",
            response=f"Meeting request sent to {inputs['client_email']} with {len(inputs['proposed_times'])} time slots.",
            actions_taken=[{"type": "email_sent", "to": inputs["client_email"]}],
        )

    async def _handle_send_email(self, inputs: dict) -> AgentResult:
        from app.services.gmail import GmailService
        gmail = GmailService()
        await gmail.send(
            to=inputs["to"],
            subject=inputs["subject"],
            body=inputs["body"],
            to_name=inputs.get("to_name", ""),
        )
        return AgentResult(
            agent="gmail",
            response=f"Email sent to {inputs['to']}: {inputs['subject']}",
            actions_taken=[{"type": "email_sent", "to": inputs["to"]}],
        )

    async def _handle_approval(self, inputs: dict) -> AgentResult:
        import json
        await self.db.execute(
            text("""
                INSERT INTO approvals (action_type, description, requested_by, payload)
                VALUES (:action_type, :description, :requested_by, :payload)
            """),
            {
                "action_type": inputs["action_type"],
                "description": inputs["description"],
                "requested_by": "ARIA",
                "payload": json.dumps(inputs.get("payload", {})),
            },
        )
        await self.db.commit()
        return AgentResult(
            agent="approval_gate",
            response=f"Approval request created for '{inputs['action_type']}'. Awaiting your decision, Sir.",
        )

    def _format_memories(self, memories: list[dict]) -> str:
        if not memories:
            return ""
        return "\n".join(
            f"• [{m['memory_type']}] {m['content'][:200]} (relevance: {m['score']:.2f})"
            for m in memories
        )

    def _format_context(self, ctx: dict) -> str:
        parts = []
        if ctx.get("inquiries"):
            parts.append(f"Open Inquiries: {len(ctx['inquiries'])}")
            for r in ctx["inquiries"][:10]:
                parts.append(f"  • {r.get('name')} <{r.get('email')}> | {r.get('service')} | {r.get('budget')}")
        if ctx.get("projects"):
            parts.append(f"Active Projects: {len(ctx['projects'])}")
            for p in ctx["projects"][:5]:
                parts.append(f"  • {p.get('name')} | {p.get('status')} | deadline: {p.get('deadline')}")
        if ctx.get("tasks"):
            pending = [t for t in ctx["tasks"] if t.get("status") != "done"]
            parts.append(f"Pending Tasks: {len(pending)}")
        return "\n".join(parts)
