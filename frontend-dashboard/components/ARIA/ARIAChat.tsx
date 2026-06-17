"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { sendMessage, getChatHistory } from "@/lib/api";
import { Mic, MicOff, Volume2, VolumeX, Send, Loader2, Shield } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  agent?: string;
  actions?: { tool: string; input: object }[];
}

const SECRET_CODE = process.env.NEXT_PUBLIC_ARIA_SECRET || "WEBAURIX";
const FEMALE_VOICES = ["samantha", "zira", "aria", "hazel", "victoria", "karen", "allison", "google us english female"];

function speakText(text: string, onStart: () => void, onEnd: () => void) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  utt.rate = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const fem = voices.find((v) =>
    v.lang.startsWith("en") && FEMALE_VOICES.some((k) => v.name.toLowerCase().includes(k))
  );
  if (fem) utt.voice = fem;
  utt.onstart = onStart;
  utt.onend = onEnd;
  utt.onerror = onEnd;
  window.speechSynthesis.speak(utt);
}

export default function ARIAChat({ sessionId, context }: { sessionId: string; context?: object }) {
  const [unlocked, setUnlocked]       = useState(false);
  const [codeInput, setCodeInput]     = useState("");
  const [codeError, setCodeError]     = useState(false);
  const [messages, setMessages]       = useState<Message[]>([]);
  const [draft, setDraft]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [ttsOn, setTtsOn]             = useState(true);
  const [speaking, setSpeaking]       = useState(false);
  const [listening, setListening]     = useState(false);

  const scrollRef    = useRef<HTMLDivElement>(null);
  const recogRef     = useRef<SpeechRecognition | null>(null);
  const ttsOnRef     = useRef(true);
  const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { ttsOnRef.current = ttsOn; }, [ttsOn]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Load history on mount
  useEffect(() => {
    getChatHistory(sessionId).then((r) => {
      if (r.data?.length) setMessages(r.data);
    }).catch(() => {});
  }, [sessionId]);

  // Speak new assistant messages
  useEffect(() => {
    if (!ttsOnRef.current || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;
    speakText(last.content, () => setSpeaking(true), () => setSpeaking(false));
  }, [messages]);

  // Lock-screen greeting
  useEffect(() => {
    if (!unlocked) {
      const t = setTimeout(() => {
        speakText(
          "Hello, Sir. I am ARIA, Chief of Staff at Webaurix. Please enter your access code.",
          () => setSpeaking(true),
          () => setSpeaking(false)
        );
      }, 600);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  const submitCode = () => {
    if (codeInput.trim().toUpperCase() === SECRET_CODE) {
      setUnlocked(true);
      speakText("Access granted. Welcome back, Sir. Ready when you are.", () => setSpeaking(true), () => setSpeaking(false));
    } else {
      setCodeError(true);
      speakText("Incorrect code, Sir. Please try again.", () => setSpeaking(true), () => setSpeaking(false));
      setCodeInput("");
    }
  };

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setLoading(true);
    try {
      const { data } = await sendMessage(text, sessionId, context);
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response,
        agent: data.agent_results?.[0]?.agent,
        actions: data.actions_taken,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error, Sir. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, sessionId, context]);

  const startListening = useCallback((forCode = false) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    recogRef.current = r;
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;

    let finalText = "";
    r.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript + " ";
        else interim = e.results[i][0].transcript;
      }
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
      silenceTimer.current = setTimeout(() => {
        const text = (finalText.trim() || interim.trim()).trim();
        r.stop();
        if (!text) { setListening(false); return; }
        if (forCode) { setCodeInput(text); setListening(false); return; }
        send(text);
        setListening(false);
      }, 2500);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    r.start();
    setListening(true);
  }, [send]);

  const toggleMic = () => {
    if (listening) { recogRef.current?.stop(); setListening(false); return; }
    startListening(false);
  };

  // ── Lock screen ──────────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-5">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 ${speaking ? "border-sky-400" : "border-zinc-700"}`}>
            🤖
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold text-lg">ARIA — Chief of Staff</h2>
            <p className="text-zinc-500 text-xs mt-1">Enter your access code to continue</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <input
              type="password"
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value); setCodeError(false); }}
              onKeyDown={(e) => e.key === "Enter" && submitCode()}
              placeholder="Access code…"
              autoFocus
              className={`w-full bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm font-mono outline-none border ${codeError ? "border-red-500" : "border-zinc-700 focus:border-sky-500"} transition-colors`}
            />
            {codeError && <p className="text-red-400 text-xs text-center">Incorrect code — try again</p>}
            <div className="flex gap-2">
              <button onClick={submitCode} className="flex-1 bg-sky-500 hover:bg-sky-400 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors">
                Verify
              </button>
              <button onClick={() => startListening(true)}
                className={`px-3 py-2.5 rounded-xl border text-sm transition-colors ${listening ? "border-sky-500 text-sky-400 bg-sky-900/20" : "border-zinc-700 text-zinc-400"}`}>
                {listening ? <Mic size={15} /> : <MicOff size={15} />}
              </button>
            </div>
          </div>
          <p className="text-zinc-600 text-xs text-center flex items-center gap-1">
            <Shield size={10} /> Internal system — access is logged
          </p>
        </div>
      </div>
    );
  }

  // ── Main chat ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <span className="text-white font-semibold text-sm">ARIA</span>
            {speaking && <span className="ml-2 text-sky-400 text-xs animate-pulse">Speaking…</span>}
          </div>
        </div>
        <button
          onClick={() => { window.speechSynthesis?.cancel(); setSpeaking(false); setTtsOn((v) => !v); }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${ttsOn ? "border-sky-600 text-sky-400 bg-sky-900/20" : "border-zinc-700 text-zinc-500"}`}
        >
          {ttsOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span>{ttsOn ? "Voice On" : "Voice Off"}</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.length === 0 && (
          <p className="text-zinc-500 text-xs text-center mt-8">Good day, Sir. How can I assist Webaurix today?</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-sky-600 text-white" : "bg-zinc-900 text-zinc-100 border border-zinc-800"}`}>
              {m.agent && <span className="text-xs text-sky-400 block mb-1">via {m.agent} agent</span>}
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
              {m.actions && m.actions.length > 0 && (
                <div className="mt-2 pt-2 border-t border-zinc-700 space-y-1">
                  {m.actions.map((a, j) => (
                    <span key={j} className="text-xs text-zinc-500 block">↳ {a.tool}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
              <Loader2 size={14} className="text-sky-400 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-800 flex items-end gap-2">
        <button onClick={toggleMic}
          className={`p-2 rounded-xl border transition-colors flex-shrink-0 ${listening ? "border-sky-500 text-sky-400 bg-sky-900/20" : "border-zinc-700 text-zinc-400"}`}>
          {listening ? <Mic size={16} /> : <MicOff size={16} />}
        </button>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }}
          rows={2}
          placeholder={listening ? "Listening… speak now" : "Ask ARIA anything, Sir…"}
          className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none resize-none focus:border-sky-600 transition-colors placeholder:text-zinc-600"
        />
        <button onClick={() => send(draft)} disabled={loading || !draft.trim()}
          className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0">
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
