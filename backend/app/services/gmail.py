"""
Gmail service — read inbound emails, send outbound via Gmail REST API.
Uses OAuth2 refresh token flow (same pattern as the existing Cloudflare Worker).
"""
from __future__ import annotations
import base64
import json
import httpx
from app.core.config import get_settings

settings = get_settings()

TOKEN_URL = "https://oauth2.googleapis.com/token"
GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me"


async def _get_access_token() -> str:
    async with httpx.AsyncClient() as client:
        resp = await client.post(TOKEN_URL, data={
            "client_id": settings.gmail_client_id,
            "client_secret": settings.gmail_client_secret,
            "refresh_token": settings.gmail_refresh_token,
            "grant_type": "refresh_token",
        })
        resp.raise_for_status()
        return resp.json()["access_token"]


def _base64url(text: str) -> str:
    return base64.urlsafe_b64encode(text.encode("utf-8")).decode("ascii").rstrip("=")


def _build_mime(to: str, to_name: str, subject: str, body: str) -> str:
    sender = settings.gmail_sender_email
    to_header = f'"{to_name}" <{to}>' if to_name else to
    mime = "\r\n".join([
        f"From: Webaurix <{sender}>",
        f"To: {to_header}",
        f"Subject: {subject}",
        'Content-Type: text/plain; charset="UTF-8"',
        "",
        body,
    ])
    return _base64url(mime)


class GmailService:
    async def send(self, to: str, subject: str, body: str, to_name: str = "") -> bool:
        token = await _get_access_token()
        raw = _build_mime(to, to_name, subject, body)
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{GMAIL_API}/messages/send",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json={"raw": raw},
            )
            resp.raise_for_status()
        return True

    async def list_unread(self, max_results: int = 20) -> list[dict]:
        token = await _get_access_token()
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{GMAIL_API}/messages",
                headers={"Authorization": f"Bearer {token}"},
                params={"q": "is:unread", "maxResults": max_results},
            )
            resp.raise_for_status()
            data = resp.json()
            message_ids = [m["id"] for m in data.get("messages", [])]

            emails = []
            for mid in message_ids:
                msg_resp = await client.get(
                    f"{GMAIL_API}/messages/{mid}",
                    headers={"Authorization": f"Bearer {token}"},
                    params={"format": "metadata", "metadataHeaders": ["Subject", "From", "Date"]},
                )
                if msg_resp.status_code == 200:
                    emails.append(self._parse_message(msg_resp.json()))
        return emails

    def _parse_message(self, msg: dict) -> dict:
        headers = {h["name"]: h["value"] for h in msg.get("payload", {}).get("headers", [])}
        return {
            "id": msg["id"],
            "subject": headers.get("Subject", ""),
            "from": headers.get("From", ""),
            "date": headers.get("Date", ""),
            "snippet": msg.get("snippet", ""),
        }
