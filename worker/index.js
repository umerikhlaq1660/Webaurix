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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ai-manager/chat" && request.method === "POST") {
      return handleChat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
