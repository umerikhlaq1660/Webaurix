"""Report generation service — daily and weekly AI-generated business reports."""
from __future__ import annotations
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.services.ai_client import chat
from app.services.gmail import GmailService
from app.core.config import get_settings

settings = get_settings()

REPORT_SYSTEM = f"""You are ARIA, reporting to the founder of {settings.company_name}.
Generate a concise, structured business report. Be direct and data-driven.
Address the founder as "Sir". Highlight what needs attention.
"""


class ReportService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def generate_daily_report(self) -> str:
        data = await self._fetch_daily_data()
        prompt = f"""Generate today's daily business report for Webaurix.

DATA:
- New inquiries today: {data['new_inquiries']}
- Consultations booked: {data['new_consultations']}
- Emails sent: {data['emails_sent']}
- Tasks completed: {data['tasks_completed']}
- Tasks overdue: {data['tasks_overdue']}
- Meetings today: {data['meetings_today']}

Highlight any urgent items and recommended actions for tomorrow."""

        result = await chat(
            messages=[{"role": "user", "content": prompt}],
            system=REPORT_SYSTEM,
            max_tokens=1000,
        )
        report_text = result["text"]

        # Store in DB
        await self.db.execute(
            text("""
                INSERT INTO reports (report_type, period_start, period_end, content, summary)
                VALUES ('daily', :start, :end, :content, :summary)
            """),
            {
                "start": datetime.utcnow().replace(hour=0, minute=0),
                "end": datetime.utcnow(),
                "content": str(data),
                "summary": report_text,
            },
        )
        await self.db.commit()
        return report_text

    async def generate_weekly_report(self) -> str:
        data = await self._fetch_weekly_data()
        prompt = f"""Generate this week's business report for Webaurix.

WEEKLY DATA:
- Total new leads: {data['new_leads']}
- Deals closed: {data['deals_closed']}
- Revenue collected: ${data['revenue']}
- Projects active: {data['active_projects']}
- Tasks completed: {data['tasks_completed']}
- Overdue tasks: {data['tasks_overdue']}
- Top priority next week: based on the above

Give strategic recommendations for next week."""

        result = await chat(
            messages=[{"role": "user", "content": prompt}],
            system=REPORT_SYSTEM,
            max_tokens=1500,
        )
        return result["text"]

    async def email_report_to_owner(self, report: str, report_type: str) -> None:
        gmail = GmailService()
        await gmail.send(
            to=settings.owner_email,
            subject=f"[{settings.company_name}] {report_type.title()} Business Report — {datetime.utcnow().date()}",
            body=report,
            to_name="Umer",
        )

    async def _fetch_daily_data(self) -> dict:
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0)
        result = await self.db.execute(
            text("""
                SELECT
                  (SELECT COUNT(*) FROM clients WHERE created_at >= :start) AS new_inquiries,
                  (SELECT COUNT(*) FROM tasks WHERE completed_at >= :start) AS tasks_completed,
                  (SELECT COUNT(*) FROM tasks WHERE due_date < NOW() AND status != 'done') AS tasks_overdue,
                  (SELECT COUNT(*) FROM meetings WHERE scheduled_at::date = CURRENT_DATE) AS meetings_today,
                  (SELECT COUNT(*) FROM email_log WHERE direction='outbound' AND sent_at >= :start) AS emails_sent,
                  0 AS new_consultations
            """),
            {"start": today_start},
        )
        row = result.mappings().first()
        return dict(row) if row else {}

    async def _fetch_weekly_data(self) -> dict:
        week_start = datetime.utcnow() - timedelta(days=7)
        result = await self.db.execute(
            text("""
                SELECT
                  (SELECT COUNT(*) FROM clients WHERE created_at >= :start) AS new_leads,
                  0 AS deals_closed,
                  0 AS revenue,
                  (SELECT COUNT(*) FROM projects WHERE status = 'active') AS active_projects,
                  (SELECT COUNT(*) FROM tasks WHERE completed_at >= :start) AS tasks_completed,
                  (SELECT COUNT(*) FROM tasks WHERE due_date < NOW() AND status != 'done') AS tasks_overdue
            """),
            {"start": week_start},
        )
        row = result.mappings().first()
        return dict(row) if row else {}
