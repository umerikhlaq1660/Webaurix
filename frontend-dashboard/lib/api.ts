import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("aria_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ────────────────────────────────────────────────────────────────────
export const login = (email: string, password: string) =>
  api.post("/api/v1/auth/token", new URLSearchParams({ username: email, password }));

export const me = () => api.get("/api/v1/auth/me");

// ── Chat ────────────────────────────────────────────────────────────────────
export const sendMessage = (message: string, sessionId?: string, context?: object) =>
  api.post("/api/v1/chat", { message, session_id: sessionId, context });

export const getChatHistory = (sessionId: string) =>
  api.get(`/api/v1/chat/history/${sessionId}`);

export const getSessions = () => api.get("/api/v1/chat/sessions");

// ── WebSocket ────────────────────────────────────────────────────────────────
export function openChatSocket(sessionId: string, onMessage: (data: object) => void) {
  const wsUrl = API_URL.replace("http", "ws");
  const ws = new WebSocket(`${wsUrl}/api/v1/chat/ws/${sessionId}`);
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  return ws;
}
