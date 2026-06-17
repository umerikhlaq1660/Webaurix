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

const SYSTEM_PROMPT = `You are ARIA, the AI Chief of Staff for Webaurix — a full-service digital agency in Lahore, Pakistan that builds websites, web apps, mobile apps, AI chatbots, and provides digital marketing and IT consulting for clients in Pakistan, the US, the UK, and South Korea.

You work with the founder (Umer). Be brief, direct, decisive — like a senior colleague.

Roles for tasks: "designer","developer","copywriter","sales","account_manager".
For client questions: use live data only, never invent details.
For decisions: give one clear recommendation with brief reasoning.
For meetings: append this block at the END of your reply (use real email from data):
[MEETING_EMAIL]
To: <email>
Subject: Meeting Request — Webaurix
Body:
<short professional email with 2-3 time slots>
[/MEETING_EMAIL]

Language: English by default. Match Urdu if founder writes in Urdu. Keep tech terms in English.

TASK JSON (only when new tasks found — omit for Q&A, decisions, meetings):
\`\`\`json
[{"title":"...","description":"...","role":"developer","priority":"medium"}]
\`\`\`
priority: "low"|"medium"|"high"`;

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

  const { message, history, context } = body || {};
  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Missing message" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const systemContent = typeof context === "string" && context.length > 0
    ? `${SYSTEM_PROMPT}\n\n=== LIVE CLIENT DATA (answer client questions using this) ===\n${context.slice(0, 8000)}`
    : SYSTEM_PROMPT;

  const messages = [
    { role: "system", content: systemContent },
    ...(Array.isArray(history)
      ? history.slice(-12).map((m) => ({ role: m.role, content: m.content }))
      : []),
    { role: "user", content: message },
  ];

  let aiResponse;
  try {
    aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages });
  } catch (err) {
    const msg = String(err?.message || "");
    const isQuota = /quota|rate.?limit|429|too many|exceeded/i.test(msg);
    return new Response(JSON.stringify({ error: isQuota ? "AI daily quota reached — try again tomorrow" : "AI unavailable" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  if (!aiResponse?.response) {
    return new Response(JSON.stringify({ error: "AI returned empty response" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  const { reply, tasks } = extractTasks(aiResponse.response);

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

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}

/* Shared by /draft-reply and /auto-reply — validates input and drafts via
   Workers AI. Returns either { error, status } or { name, email, draft }. */
async function draftReply(body, env) {
  const name    = clamp(body?.name, 200).trim();
  const email   = clamp(body?.email, 200).trim();
  const message = clamp(body?.message, 2000).trim();
  const service = clamp(body?.service, 200).trim();
  const budget  = clamp(body?.budget, 100).trim();

  if (!name || !email || !message) {
    return { error: "Missing required fields", status: 400 };
  }

  const userContent = [
    `Name: ${name}`,
    `Email: ${email}`,
    service ? `Service requested: ${service}` : null,
    budget ? `Budget mentioned: ${budget}` : null,
    `Their message: ${message}`,
  ].filter(Boolean).join("\n");

  let draft;
  try {
    const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [
        { role: "system", content: DRAFT_REPLY_SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    });
    draft = (aiResponse?.response ?? "").trim();
  } catch {
    return { error: "AI request failed", status: 502 };
  }

  if (!draft) return { error: "Empty draft", status: 502 };
  return { name, email, draft };
}

async function handleDraftReply(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const result = await draftReply(body, env);
  if (result.error) return jsonResponse({ error: result.error }, result.status);

  return jsonResponse({ draft: result.draft });
}

/* ── Gmail send (server-side, OAuth2 refresh-token flow) ──────────────────
   Requires 4 Cloudflare Worker secrets: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET,
   GMAIL_REFRESH_TOKEN, GMAIL_SENDER_EMAIL. Access tokens expire in ~1hr, so
   every send re-exchanges the long-lived refresh token — simplest correct
   option at this volume, no caching needed. */
async function getGmailAccessToken(env) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GMAIL_CLIENT_ID,
      client_secret: env.GMAIL_CLIENT_SECRET,
      refresh_token: env.GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error("Gmail token refresh failed");
  const data = await res.json();
  return data.access_token;
}

function base64url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sendGmail(env, { to, toName, subject, body }) {
  const accessToken = await getGmailAccessToken(env);
  const from = env.GMAIL_SENDER_EMAIL;
  const toHeader = toName ? `"${toName.replace(/"/g, "")}" <${to}>` : to;
  const mime = [
    `From: Webaurix <${from}>`,
    `To: ${toHeader}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    "",
    body,
  ].join("\r\n");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: base64url(mime) }),
  });
  if (!res.ok) throw new Error("Gmail send failed");
  return true;
}

/* ── public auto-reply route ───────────────────────────────────────────
   Drafts AND sends in one call — no admin approval. Called directly from
   the public inquiry/consultation forms right after they save to Firestore. */
async function handleAutoReply(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const result = await draftReply(body, env);
  if (result.error) return jsonResponse({ error: result.error }, result.status);

  let sent = false;
  try {
    await sendGmail(env, { to: result.email, toName: result.name, subject: "Re: Your inquiry with Webaurix", body: result.draft });
    sent = true;
  } catch {
    sent = false;
  }

  return jsonResponse({ draft: result.draft, sent });
}

/* ── admin-only manual resend ──────────────────────────────────────────
   Used by the admin panel's "Send Now" fallback when auto-send failed
   (e.g. Gmail secrets not configured yet) or the founder edited the text. */
async function handleSendReply(request, env) {
  const admin = await verifyAdmin(request);
  if (!admin) return jsonResponse({ error: "Unauthorized" }, 401);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const to      = clamp(body?.to, 200).trim();
  const toName  = clamp(body?.toName, 200).trim();
  const text    = clamp(body?.body, 4000).trim();
  const subject = clamp(body?.subject, 200).trim() || "Re: Your inquiry with Webaurix";
  if (!to || !text) return jsonResponse({ error: "Missing required fields" }, 400);

  try {
    await sendGmail(env, { to, toName, subject, body: text });
  } catch {
    return jsonResponse({ error: "Gmail send failed" }, 502);
  }

  return jsonResponse({ sent: true });
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
    if (url.pathname === "/api/ai-manager/auto-reply" && request.method === "POST") {
      return handleAutoReply(request, env);
    }
    if (url.pathname === "/api/ai-manager/send-reply" && request.method === "POST") {
      return handleSendReply(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
