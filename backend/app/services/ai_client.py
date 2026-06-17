"""
Claude API client — wraps anthropic SDK with retry logic, token tracking,
and a unified interface for chat + tool-calling used by all agents.
"""
from __future__ import annotations
import json
from typing import Any
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential
from app.core.config import get_settings

settings = get_settings()
_client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)


@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
async def chat(
    messages: list[dict],
    system: str,
    tools: list[dict] | None = None,
    max_tokens: int = 4096,
    temperature: float = 0.3,
) -> dict[str, Any]:
    """
    Send a chat request to Claude and return a normalized response dict:
        { "text": str, "tool_use": list[dict] | None, "tokens": int }
    """
    kwargs: dict[str, Any] = {
        "model": settings.anthropic_model,
        "max_tokens": max_tokens,
        "system": system,
        "messages": messages,
        "temperature": temperature,
    }
    if tools:
        kwargs["tools"] = tools

    response = await _client.messages.create(**kwargs)

    text_parts: list[str] = []
    tool_calls: list[dict] = []

    for block in response.content:
        if block.type == "text":
            text_parts.append(block.text)
        elif block.type == "tool_use":
            tool_calls.append({
                "id": block.id,
                "name": block.name,
                "input": block.input,
            })

    return {
        "text": "\n".join(text_parts).strip(),
        "tool_use": tool_calls or None,
        "stop_reason": response.stop_reason,
        "tokens": response.usage.input_tokens + response.usage.output_tokens,
    }


async def get_embedding(text: str) -> list[float]:
    """
    Generate a 1536-dim embedding via OpenAI text-embedding-3-small.
    Falls back to a zero vector on failure so the system doesn't crash.
    """
    try:
        from openai import AsyncOpenAI
        oai = AsyncOpenAI(api_key=settings.openai_api_key)
        resp = await oai.embeddings.create(
            model=settings.embedding_model,
            input=text[:8000],
            dimensions=settings.embedding_dimensions,
        )
        return resp.data[0].embedding
    except Exception:
        return [0.0] * settings.embedding_dimensions
