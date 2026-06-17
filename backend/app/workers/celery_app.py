"""
Celery app + scheduled tasks.
- Daily report: 8 AM PKT (3 AM UTC)
- Weekly report: Monday 8 AM PKT
- Email digest: check unread Gmail every 30 minutes
- Overdue task alerts: every 2 hours
"""
from celery import Celery
from celery.schedules import crontab
import asyncio
from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "aria",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.workers.celery_app"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "daily-report": {
            "task": "app.workers.celery_app.send_daily_report",
            "schedule": crontab(hour=3, minute=0),  # 8 AM PKT
        },
        "weekly-report": {
            "task": "app.workers.celery_app.send_weekly_report",
            "schedule": crontab(hour=3, minute=0, day_of_week=1),  # Monday 8 AM PKT
        },
        "check-emails": {
            "task": "app.workers.celery_app.process_inbound_emails",
            "schedule": crontab(minute="*/30"),
        },
        "overdue-alerts": {
            "task": "app.workers.celery_app.check_overdue_tasks",
            "schedule": crontab(minute=0, hour="*/2"),
        },
    },
)


def run_async(coro):
    """Helper to run async code inside sync Celery tasks."""
    return asyncio.get_event_loop().run_until_complete(coro)


@celery_app.task(name="app.workers.celery_app.send_daily_report", bind=True, max_retries=3)
def send_daily_report(self):
    async def _run():
        from app.core.database import AsyncSessionLocal
        from app.services.reports import ReportService
        async with AsyncSessionLocal() as db:
            svc = ReportService(db)
            report = await svc.generate_daily_report()
            await svc.email_report_to_owner(report, "daily")
    try:
        run_async(_run())
    except Exception as exc:
        raise self.retry(exc=exc, countdown=300)


@celery_app.task(name="app.workers.celery_app.send_weekly_report", bind=True, max_retries=3)
def send_weekly_report(self):
    async def _run():
        from app.core.database import AsyncSessionLocal
        from app.services.reports import ReportService
        async with AsyncSessionLocal() as db:
            svc = ReportService(db)
            report = await svc.generate_weekly_report()
            await svc.email_report_to_owner(report, "weekly")
    try:
        run_async(_run())
    except Exception as exc:
        raise self.retry(exc=exc, countdown=600)


@celery_app.task(name="app.workers.celery_app.process_inbound_emails")
def process_inbound_emails():
    async def _run():
        from app.core.database import AsyncSessionLocal
        from app.services.gmail import GmailService
        from app.agents.orchestrator import ARIAOrchestrator
        gmail = GmailService()
        emails = await gmail.list_unread(max_results=10)
        if not emails:
            return
        async with AsyncSessionLocal() as db:
            orchestrator = ARIAOrchestrator(db)
            for email in emails:
                summary_prompt = (
                    f"Summarize and categorize this email for the founder:\n"
                    f"From: {email['from']}\nSubject: {email['subject']}\n"
                    f"Preview: {email['snippet']}"
                )
                await orchestrator.process(
                    message=summary_prompt,
                    session_id=f"email_{email['id']}",
                    channel="email",
                )
    run_async(_run())


@celery_app.task(name="app.workers.celery_app.check_overdue_tasks")
def check_overdue_tasks():
    async def _run():
        from app.core.database import AsyncSessionLocal
        from app.services.gmail import GmailService
        from sqlalchemy import text
        async with AsyncSessionLocal() as db:
            result = await db.execute(text("""
                SELECT t.title, t.assigned_agent, t.due_date, p.name AS project_name
                FROM tasks t LEFT JOIN projects p ON p.id = t.project_id
                WHERE t.due_date < NOW() AND t.status NOT IN ('done','cancelled')
                ORDER BY t.due_date ASC LIMIT 10
            """))
            overdue = result.mappings().all()
            if not overdue:
                return

            body = "Overdue tasks requiring attention, Sir:\n\n"
            for t in overdue:
                body += f"• [{t['assigned_agent']}] {t['title']} — {t['project_name']} (due: {t['due_date']})\n"

            gmail = GmailService()
            await gmail.send(
                to=settings.owner_email,
                subject=f"[ARIA] {len(overdue)} Overdue Tasks",
                body=body,
                to_name="Umer",
            )
    run_async(_run())
