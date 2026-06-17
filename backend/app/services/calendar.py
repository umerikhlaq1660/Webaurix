"""Google Calendar service — schedule, update, and list events."""
from __future__ import annotations
import json
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from app.core.config import get_settings

settings = get_settings()

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def _get_service():
    info = json.loads(settings.google_service_account_json)
    creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    return build("calendar", "v3", credentials=creds, cache_discovery=False)


class CalendarService:
    def create_event(
        self,
        title: str,
        start: datetime,
        duration_minutes: int = 60,
        attendees: list[str] | None = None,
        description: str = "",
        meet_link: bool = True,
    ) -> dict:
        service = _get_service()
        end = start + timedelta(minutes=duration_minutes)
        event: dict = {
            "summary": title,
            "description": description,
            "start": {"dateTime": start.isoformat(), "timeZone": "Asia/Karachi"},
            "end":   {"dateTime": end.isoformat(),   "timeZone": "Asia/Karachi"},
        }
        if attendees:
            event["attendees"] = [{"email": a} for a in attendees]
        if meet_link:
            event["conferenceData"] = {
                "createRequest": {"requestId": f"webaurix-{int(start.timestamp())}"}
            }

        created = service.events().insert(
            calendarId=settings.google_calendar_id,
            body=event,
            conferenceDataVersion=1 if meet_link else 0,
            sendUpdates="all",
        ).execute()

        return {
            "id": created["id"],
            "link": created.get("hangoutLink", ""),
            "html_link": created.get("htmlLink", ""),
        }

    def list_upcoming(self, days: int = 7) -> list[dict]:
        service = _get_service()
        now = datetime.utcnow().isoformat() + "Z"
        future = (datetime.utcnow() + timedelta(days=days)).isoformat() + "Z"
        result = service.events().list(
            calendarId=settings.google_calendar_id,
            timeMin=now, timeMax=future,
            singleEvents=True, orderBy="startTime",
        ).execute()
        return result.get("items", [])
