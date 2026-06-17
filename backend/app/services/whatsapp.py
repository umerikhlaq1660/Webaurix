"""
WhatsApp Business API service — send and receive messages via Meta's Cloud API.
"""
from __future__ import annotations
import httpx
from app.core.config import get_settings

settings = get_settings()
WA_API = f"https://graph.facebook.com/v20.0/{settings.whatsapp_phone_number_id}"


class WhatsAppService:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {settings.whatsapp_token}",
            "Content-Type": "application/json",
        }

    async def send_text(self, to: str, message: str) -> bool:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{WA_API}/messages",
                headers=self.headers,
                json={
                    "messaging_product": "whatsapp",
                    "to": to,
                    "type": "text",
                    "text": {"body": message},
                },
            )
            return resp.status_code == 200

    async def send_template(self, to: str, template_name: str, params: list[str]) -> bool:
        components = [{"type": "body", "parameters": [{"type": "text", "text": p} for p in params]}]
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{WA_API}/messages",
                headers=self.headers,
                json={
                    "messaging_product": "whatsapp",
                    "to": to,
                    "type": "template",
                    "template": {
                        "name": template_name,
                        "language": {"code": "en_US"},
                        "components": components,
                    },
                },
            )
            return resp.status_code == 200

    def parse_inbound(self, payload: dict) -> dict | None:
        """Extract message from WhatsApp webhook payload."""
        try:
            entry = payload["entry"][0]["changes"][0]["value"]
            msg = entry["messages"][0]
            contact = entry["contacts"][0]
            return {
                "from": msg["from"],
                "name": contact["profile"]["name"],
                "text": msg.get("text", {}).get("body", ""),
                "type": msg["type"],
                "timestamp": msg["timestamp"],
            }
        except (KeyError, IndexError):
            return None
