import { createRemoteJWKSet, jwtVerify } from "jose";

/* Must match ADMIN_EMAIL in src/Pages/AdminPanel.jsx and the Firebase
   project in src/firebase.js — kept in sync manually since this file is
   bundled by Wrangler, not Vite. */
const ADMIN_EMAIL = "umerikhlaq160@gmail.com";
const FIREBASE_PROJECT_ID = "webaurixsite";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

async function verifyAdmin(request) {
  const authHeader = request.headers.get("Authorization") || "";
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return null;

  try {
    const { payload } = await jwtVerify(match[1], JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    if (payload.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;
    return payload;
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are the AI Project Manager for Webaurix, a digital agency. The founder will describe a client's needs or paste raw requirements. Your job:

1. Reply conversationally and briefly, acknowledging the request.
2. Break the request into concrete, actionable tasks. Each task must be assigned to exactly one role: "designer", "developer", "copywriter", "sales", or "account_manager".
3. If — and only if — you identified new actionable tasks in this message, append a fenced code block at the very end of your reply, formatted exactly like this:

\`\`\`json
[{"title": "...", "description": "...", "role": "developer", "priority": "medium"}]
\`\`\`

priority must be one of "low", "medium", "high". If there are no new tasks (e.g. the founder is just asking a question), omit the json block entirely. Keep the conversational part separate — do not mention the json block in your prose reply.`;

function extractTasks(replyText) {
  const match = replyText.match(/```json\s*([\s\S]*?)```/);
  if (!match) return { reply: replyText.trim(), tasks: [] };

  const cleaned = replyText.replace(match[0], "").trim();
  try {
    const parsed = JSON.parse(match[1]);
    const tasks = Array.isArray(parsed)
      ? parsed.filter((t) => t && typeof t.title === "string" && typeof t.role === "string")
      : [];
    return { reply: cleaned, tasks };
  } catch {
    return { reply: cleaned, tasks: [] };
  }
}

async function handleChat(request, env) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const { message, history } = body || {};
  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Missing message" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(Array.isArray(history)
      ? history.slice(-12).map((m) => ({ role: m.role, content: m.content }))
      : []),
    { role: "user", content: message },
  ];

  let aiResponse;
  try {
    aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages });
  } catch {
    return new Response(JSON.stringify({ error: "AI request failed" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  const { reply, tasks } = extractTasks(aiResponse?.response ?? "");

  return new Response(JSON.stringify({ reply, tasks }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/* ── public draft-reply route ──────────────────────────────────────────
   Called directly from the public inquiry/consultation forms, no login.
   Workers AI free tier is a daily quota, not billed, so the worst case of
   abuse is the feature pausing for the day — not a bill. Field length caps
   below are the only abuse guard for this MVP. */
const DRAFT_REPLY_SYSTEM_PROMPT = `You are writing on behalf of Webaurix, a Lahore, Pakistan based digital agency. Webaurix builds custom websites and web apps (MERN stack), e-commerce stores, AI chatbots and AI-powered tools, mobile apps, and UI/UX design for clients in Pakistan, the US, the UK, and South Korea.

A potential client just submitted an inquiry or consultation request. Write a short, warm, professional reply directly to them (you are writing the message body itself, not describing one). Rules:
- Acknowledge their specific request, don't sound generic.
- Do NOT quote an exact price or budget figure, even if they asked. Briefly note that pricing depends on scope and offer to discuss it on a short call.
- Ask exactly one clarifying question OR propose a brief call/next step.
- Keep it under 120 words.
- Sign off as "Webaurix Team".
- Output ONLY the message body — no subject line, no preamble like "Here's a draft", no markdown formatting.`;

function clamp(str, max) {
  return typeof str === "string" ? str.slice(0, max) : "";
}

async function handleDraftReply(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const name    = clamp(body?.name, 200).trim();
  const email   = clamp(body?.email, 200).trim();
  const message = clamp(body?.message, 2000).trim();
  const service = clamp(body?.service, 200).trim();
  const budget  = clamp(body?.budget, 100).trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const userContent = [
    `Name: ${name}`,
    `Email: ${email}`,
    service ? `Service requested: ${service}` : null,
    budget ? `Budget mentioned: ${budget}` : null,
    `Their message: ${message}`,
  ].filter(Boolean).join("\n");

  let aiResponse;
  try {
    aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [
        { role: "system", content: DRAFT_REPLY_SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    });
  } catch {
    return new Response(JSON.stringify({ error: "AI request failed" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  const draft = (aiResponse?.response ?? "").trim();
  if (!draft) {
    return new Response(JSON.stringify({ error: "Empty draft" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ draft }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ai-manager/chat" && request.method === "POST") {
      return handleChat(request, env);
    }
    if (url.pathname === "/api/ai-manager/draft-reply" && request.method === "POST") {
      return handleDraftReply(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
