import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot, X, Send, ArrowLeft, AlertCircle,
  Plus, Loader, Home, MessageCircle, HelpCircle,
  MoreVertical, ExternalLink, Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import icon from "../assets/Logoicon.png";
import customAnswers from "../data/customAnswers";
import keywordAnswers from "../data/keywordAnswers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import stringSimilarity from "string-similarity";

/*  theme tokens (always dark for chatbot window) */
const C = {
  bg:         "#0c1015",
  surface:    "rgba(255,255,255,0.04)",
  surfaceHov: "rgba(255,255,255,0.07)",
  border:     "rgba(255,255,255,0.08)",
  accent:     "#68b5cc",
  accentDim:  "rgba(104,181,204,0.15)",
  primary:    "#f0eeec",
  muted:      "rgba(240,238,236,0.45)",
  userBubble: "#68b5cc",
  botBubble:  "rgba(255,255,255,0.07)",
  inputBg:    "rgba(255,255,255,0.05)",
};

const initialForm = { firstName: "", email: "", phoneNumber: "", quries: "" };

/* ─── typing dots ─── */
const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-0.5">
    {[0, 0.15, 0.3].map((d, i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: C.muted }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ duration: 0.9, delay: d, repeat: Infinity }}
      />
    ))}
  </div>
);

/*  chat input field  */
const ChatInput = ({ value, onChange, onSend, loading }) => (
  <div className="flex items-center gap-2 px-4 py-3"
    style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      placeholder="Type a message…"
      className="flex-1 bg-transparent text-[13.5px] outline-none"
      style={{ color: C.primary }}
    />
    <motion.button
      onClick={onSend}
      disabled={loading || !value.trim()}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer flex-shrink-0 transition-opacity duration-200"
      style={{
        background: C.accent,
        color: "#0c1015",
        opacity: loading || !value.trim() ? 0.45 : 1,
      }}
    >
      <Send size={13} />
    </motion.button>
  </div>
);

/* ─── bottom nav tab ─── */
const NavTab = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className="flex flex-col items-center gap-0.5 flex-1 py-2 cursor-pointer transition-colors duration-200"
    style={{ color: active ? C.accent : C.muted }}
  >
    <Icon size={17} />
    <span className="text-[10px] font-medium">{label}</span>
    {active && (
      <motion.div
        layoutId="tab-indicator"
        className="w-4 h-0.5 rounded-full"
        style={{ background: C.accent }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
  </button>
);

/* MAIN */
const Chatbot = () => {
  const [isOpen, setIsOpen]                   = useState(false);
  const [showGreeting, setShowGreeting]       = useState(false);
  const [activeTab, setActiveTab]             = useState("home");
  const [isQuestionMode, setIsQuestionMode]   = useState(false);
  const [messages, setMessages]               = useState([]);
  const [input, setInput]                     = useState("");
  const [loading, setLoading]                 = useState(false);
  const [showForm, setShowForm]               = useState(false);
  const [formData, setFormData]               = useState(initialForm);
  const [errors, setErrors]                   = useState({});
  const [showInputBox, setShowInputBox]       = useState(false);
  const [showNotice, setShowNotice]           = useState(false);
  const [showPredefined, setShowPredefined]   = useState(true);
  const [chatHistory, setChatHistory]         = useState([]);
  const [currentChatId, setCurrentChatId]     = useState(null);
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [deletingAll, setDeletingAll]         = useState(false);

  const messagesEndRef = useRef(null);
  const formRef        = useRef(null);

  /* greeting */
  useEffect(() => {
    const t1 = setTimeout(() => setShowGreeting(true),  2000);
    const t2 = setTimeout(() => setShowGreeting(false), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => { if (isOpen) setShowGreeting(false); }, [isOpen]);

  /* localStorage */
  useEffect(() => {
    const h = localStorage.getItem("chatHistory");
    if (h) setChatHistory(JSON.parse(h));
  }, []);
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);
  useEffect(() => {
    if (currentChatId) {
      const m = localStorage.getItem(`chatMessages_${currentChatId}`);
      if (m) setMessages(JSON.parse(m));
    }
  }, [currentChatId]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (currentChatId)
      localStorage.setItem(`chatMessages_${currentChatId}`, JSON.stringify(messages));
  }, [messages, currentChatId]);

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* fuzzy match */
  const getFuzzyAnswer = (text) => {
    let best = { score: 0, answer: "" };
    keywordAnswers.forEach((item) => {
      item.keywords.forEach((kw) => {
        const s = stringSimilarity.compareTwoStrings(text.toLowerCase(), kw.toLowerCase());
        if (s > best.score) best = { score: s, answer: item.answer };
      });
    });
    return best.score >= 0.3 ? best.answer : null;
  };

  /* send message */
  const sendMessage = async (customMsg) => {
    const text = (customMsg || input).trim();
    if (!text || loading) return;
    if (!isQuestionMode) setIsQuestionMode(true);
    if (activeTab !== "chat") setActiveTab("chat");

    setInput("");
    setLoading(true);
    setShowPredefined(false);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, time: formatTime() },
      { role: "assistant", content: "__typing__", time: "" },
    ]);

    setTimeout(() => {
      const respond = (answer) => {
        setMessages((prev) => [
          ...prev.filter((m) => m.content !== "__typing__"),
          { role: "assistant", content: answer, time: formatTime() },
        ]);
        setChatHistory((prev) => {
          const snippet = answer.split("\n")[0].slice(0, 60) + (answer.length > 60 ? "…" : "");
          if (currentChatId)
            return prev.map((c) => c.id === currentChatId ? { ...c, lastMsg: snippet, time: formatTime() } : c);
          const entry = { id: Date.now(), botName: "WebaurixBot", lastMsg: snippet, time: formatTime() };
          setCurrentChatId(entry.id);
          return [...prev, entry];
        });
        setShowNotice(true);
        setShowInputBox(true);
        setShowForm(false);
        setLoading(false);
      };

      if (text.toLowerCase() === "something else") {
        respond("You can ask any question here. How can I help?");
        return;
      }
      const matchedKey = Object.keys(customAnswers).find((k) => k.toLowerCase() === text.toLowerCase());
      if (matchedKey) { respond(customAnswers[matchedKey]); return; }
      const fuzzy = getFuzzyAnswer(text);
      if (fuzzy) { respond(fuzzy); return; }
      respond("Our team is currently unavailable. Please fill in your details below and we'll get back to you:");
      setShowForm(true);
    }, 1500);
  };

  /* form */
  const validateForm = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phoneNumber.trim()) e.phoneNumber = "Required";
    if (!formData.quries.trim()) e.quries = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID_NEW,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_NEW,
        { name: formData.firstName, email: formData.email, phoneNumber: formData.phoneNumber, quries: formData.quries },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY_NEW,
      );
      setShowForm(false);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `Got it **${formData.firstName}** - your message has been sent! Our team will be in touch soon. 👍`,
        time: formatTime(),
      }]);
      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again later.", time: formatTime() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const startNewChat = () => {
    const newId = Date.now();
    setCurrentChatId(newId);
    setMessages([{ role: "assistant", content: "__typing__", time: "" }]);
    setChatHistory((prev) => [...prev, { id: newId, botName: "WebaurixBot", lastMsg: "Hi! What brings you here today?", time: formatTime() }]);
    setIsQuestionMode(true);
    setShowPredefined(false);
    setShowInputBox(false);
    setShowForm(false);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: "Hi! What brings you here today?", time: formatTime() }]);
      setShowPredefined(true);
      setShowInputBox(true);
      setShowNotice(true);
    }, 1500);
  };

  const deleteAllChats = () => {
    setDeletingAll(true);
    setTimeout(() => {
      setChatHistory([]); setCurrentChatId(null); setMessages([]);
      localStorage.clear(); setDeletingAll(false); setDropdownOpen(false);
    }, 1000);
  };

  const predefinedQuestions = [
    "I have questions about pricing",
    "I have questions about my invoice",
    "I'm looking for support",
    "I'm a developer learning more",
    "Something else",
  ];

  const faqQuestions = [
    "What services do you offer?",
    "How long does a project usually take?",
    "Do you provide post-launch support?",
    "Can you develop custom web applications?",
    "What are your pricing plans?",
    "Do you offer IT consultancy?",
    "How do you handle client confidentiality?",
  ];

  const resources = [
    { title: "Book a Consultation", link: "https://calendly.com/umerikhlaq1660/30min" },
    { title: "View Portfolio",       link: "https://webaurix.com/portfolio" },
    { title: "Webaurix AI",          link: "https://ai.webaurix.com/" },
    { title: "Webaurix Blogs",       link: "https://webaurix.com/blogs" },
  ];

  /* ── input style helper ── */
  const inputSx = {
    background: C.inputBg,
    border: `1px solid ${C.border}`,
    color: C.primary,
    borderRadius: "10px",
    padding: "8px 12px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
  };

  return (
    <>
      {/* ── FAB ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{ background: C.accent, color: "#0c1015", boxShadow: `0 4px 24px ${C.accentDim}`, willChange: "transform" }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={isOpen ? "x" : "bot"}
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={19} /> : <Bot size={19} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── Greeting bubble ── */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-[4.5rem] z-50 rounded-2xl px-4 py-3 w-[210px]"
            style={{ background: "rgba(12,16,21,0.95)", border: `1px solid ${C.border}`, backdropFilter: "blur(14px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
          >
            <p className="text-[13px] font-semibold mb-0.5" style={{ color: C.accent }}>👋 Hi there!</p>
            <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>Need help? Click to chat with us.</p>
            <div className="absolute right-[-5px] bottom-4 w-2.5 h-2.5 rotate-45"
              style={{ background: "rgba(12,16,21,0.95)", borderRight: `1px solid ${C.border}`, borderTop: `1px solid ${C.border}` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-5 z-50 w-[92vw] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              height: "min(82vh, 600px)",
              background: C.bg,
              border: `1px solid ${C.border}`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(104,181,204,0.08)`,
            }}
          >
            {/* ── HEADER ── */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2.5">
                {isQuestionMode && (
                  <motion.button
                    onClick={() => setIsQuestionMode(false)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{ background: C.surface, color: C.muted }}
                  >
                    <ArrowLeft size={13} />
                  </motion.button>
                )}
                <div className="relative">
                  <img src={icon} alt="Bot" className="w-8 h-8 rounded-xl object-contain" style={{ background: C.accentDim }} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "#4ade80", borderColor: C.bg }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-tight" style={{ color: C.primary }}>Webaurix Assistant</p>
                  <p className="text-[10px]" style={{ color: C.muted }}>Online - typically replies instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative">
                {activeTab === "chat" && (
                  <>
                    <motion.button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                      style={{ background: dropdownOpen ? C.surface : "transparent", color: C.muted }}
                    >
                      <MoreVertical size={14} />
                    </motion.button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-9 rounded-xl overflow-hidden z-50 min-w-[170px]"
                          style={{ background: "#111820", border: `1px solid ${C.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                        >
                          <button
                            onClick={deleteAllChats}
                            className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] cursor-pointer transition-colors duration-150"
                            style={{ color: "#f87171" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.08)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            {deletingAll
                              ? <Loader size={13} className="animate-spin" />
                              : <Trash2 size={13} />}
                            Delete all history
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{ background: C.surface, color: C.muted }}
                >
                  <X size={13} />
                </motion.button>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: `${C.border} transparent` }}>

              {!isQuestionMode ? (
                <AnimatePresence mode="wait">
                  {/* HOME TAB */}
                  {activeTab === "home" && (
                    <motion.div key="home"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col p-4 gap-4"
                    >
                      {/* welcome card */}
                      <div className="rounded-xl p-4 flex items-center gap-3"
                        style={{ background: C.accentDim, border: `1px solid rgba(104,181,204,0.15)` }}>
                        <img src={icon} alt="Logo" className="w-10 h-10 rounded-xl flex-shrink-0 object-contain" />
                        <div>
                          <p className="text-[14px] font-bold" style={{ color: C.primary }}>Welcome to Webaurix!</p>
                          <p className="text-[12px]" style={{ color: C.muted }}>Ask me anything about our services.</p>
                        </div>
                      </div>

                      {/* FAQ questions */}
                      <div>
                        <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase mb-2.5" style={{ color: C.muted }}>
                          Quick questions
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {faqQuestions.map((q, i) => (
                            <motion.button
                              key={i}
                              onClick={() => sendMessage(q)}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                              className="text-left px-3 py-2.5 rounded-xl text-[12.5px] cursor-pointer transition-colors duration-150 flex items-center justify-between gap-2 group"
                              style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.primary }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${C.accent}40`}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}
                            >
                              {q}
                              <span style={{ color: C.accent, flexShrink: 0 }}>→</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CHAT TAB */}
                  {activeTab === "chat" && (
                    <motion.div key="chat"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col h-full p-3 gap-2"
                    >
                      {chatHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: C.accentDim }}>
                            <MessageCircle size={20} style={{ color: C.accent }} />
                          </div>
                          <p className="text-[14px] font-semibold" style={{ color: C.primary }}>No conversations yet</p>
                          <p className="text-[12px] text-center max-w-[200px]" style={{ color: C.muted }}>Start a new chat to ask your questions</p>
                          <motion.button onClick={startNewChat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold cursor-pointer mt-2"
                            style={{ background: C.accent, color: "#0c1015" }}>
                            <Plus size={13} /> New chat
                          </motion.button>
                        </div>
                      ) : (
                        <>
                          {chatHistory.map((chat) => (
                            <motion.div key={chat.id}
                              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                              onClick={() => {
                                setCurrentChatId(chat.id);
                                const m = localStorage.getItem(`chatMessages_${chat.id}`);
                                if (m) setMessages(JSON.parse(m));
                                setIsQuestionMode(true); setShowPredefined(true); setShowInputBox(true); setShowForm(false);
                              }}
                              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-150"
                              style={{ background: C.surface, border: `1px solid ${C.border}` }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${C.accent}35`}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}
                            >
                              <img src={icon} alt="Bot" className="w-8 h-8 rounded-xl flex-shrink-0 object-contain" style={{ background: C.accentDim }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold" style={{ color: C.primary }}>{chat.botName}</p>
                                <p className="text-[11px] truncate" style={{ color: C.muted }}>{chat.lastMsg}</p>
                              </div>
                              <span className="text-[10px] flex-shrink-0" style={{ color: C.muted }}>{chat.time}</span>
                            </motion.div>
                          ))}
                          <motion.button onClick={startNewChat} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12.5px] font-semibold cursor-pointer mt-1"
                            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.accent }}>
                            <Plus size={13} /> New chat
                          </motion.button>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* HELP TAB */}
                  {activeTab === "help" && (
                    <motion.div key="help"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col p-4 gap-4"
                    >
                      <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase" style={{ color: C.muted }}>Quick links</p>
                      <div className="flex flex-col gap-2">
                        {resources.map((res, i) => (
                          <a key={i} href={res.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-[13px] font-medium transition-colors duration-150"
                            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.primary, textDecoration: "none" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.accent}40`; e.currentTarget.style.color = C.accent; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.primary; }}
                          >
                            {res.title}
                            <ExternalLink size={12} style={{ color: C.muted, flexShrink: 0 }} />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              ) : (
                /* ── CHAT MESSAGES ── */
                <div className="flex flex-col gap-3 p-4 pb-2">
                  {showNotice && showInputBox && (
                    <div className="flex items-start gap-2 px-3 py-2 rounded-xl text-[11px]"
                      style={{ background: "rgba(104,181,204,0.06)", border: `1px solid ${C.accentDim}`, color: C.muted }}>
                      <AlertCircle size={12} style={{ color: C.accent, marginTop: 1, flexShrink: 0 }} />
                      This chat may be monitored or reviewed by Webaurix.
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {msg.role === "assistant" && (
                        <img src={icon} alt="bot" className="w-6 h-6 rounded-lg flex-shrink-0 self-end object-contain" style={{ background: C.accentDim }} />
                      )}
                      <div className="max-w-[78%]">
                        <div className="px-3 py-2 rounded-2xl text-[13px] leading-relaxed"
                          style={{
                            background: msg.role === "user" ? C.userBubble : C.botBubble,
                            color: msg.role === "user" ? "#0c1015" : C.primary,
                            borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          }}>
                          {msg.content === "__typing__"
                            ? <TypingDots />
                            : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                        </div>
                        {msg.time && (
                          <p className="text-[9.5px] mt-0.5 px-1"
                            style={{ color: C.muted, textAlign: msg.role === "user" ? "right" : "left" }}>
                            {msg.time}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* inline contact form */}
                  {showForm && (
                    <motion.form
                      ref={formRef}
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2.5 p-3 rounded-2xl mt-1"
                      style={{ background: C.surface, border: `1px solid ${C.border}` }}
                    >
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: C.accent }}>Leave your details</p>

                      <div>
                        <input type="text" name="firstName" placeholder="Your name" value={formData.firstName}
                          onChange={handleChange} style={inputSx}
                          onFocus={(e) => e.target.style.borderColor = C.accent}
                          onBlur={(e) => e.target.style.borderColor = C.border} />
                        {errors.firstName && <p className="text-[10.5px] mt-1" style={{ color: "#f87171" }}>{errors.firstName}</p>}
                      </div>
                      <div>
                        <input type="email" name="email" placeholder="Email address" value={formData.email}
                          onChange={handleChange} style={inputSx}
                          onFocus={(e) => e.target.style.borderColor = C.accent}
                          onBlur={(e) => e.target.style.borderColor = C.border} />
                        {errors.email && <p className="text-[10.5px] mt-1" style={{ color: "#f87171" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <PhoneInput country="pk" value={formData.phoneNumber}
                          onChange={(val) => setFormData((p) => ({ ...p, phoneNumber: val }))}
                          inputStyle={{ ...inputSx, paddingLeft: "48px" }}
                          buttonStyle={{ background: C.inputBg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}`, borderRight: "none", borderRadius: "10px 0 0 10px" }}
                          dropdownStyle={{ background: "#111820", border: `1px solid ${C.border}`, borderRadius: "10px", color: C.primary }}
                        />
                        {errors.phoneNumber && <p className="text-[10.5px] mt-1" style={{ color: "#f87171" }}>{errors.phoneNumber}</p>}
                      </div>
                      <div>
                        <textarea name="quries" placeholder="Your message…" value={formData.quries}
                          onChange={handleChange} rows={3}
                          style={{ ...inputSx, resize: "none" }}
                          onFocus={(e) => e.target.style.borderColor = C.accent}
                          onBlur={(e) => e.target.style.borderColor = C.border} />
                        {errors.quries && <p className="text-[10.5px] mt-1" style={{ color: "#f87171" }}>{errors.quries}</p>}
                      </div>
                      <motion.button type="submit" disabled={loading}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="w-full py-2 rounded-xl text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-opacity duration-200"
                        style={{ background: C.accent, color: "#0c1015", opacity: loading ? 0.7 : 1 }}>
                        {loading ? <><Loader size={13} className="animate-spin" /> Sending…</> : "Send message"}
                      </motion.button>
                    </motion.form>
                  )}

                  {/* predefined quick replies */}
                  {showPredefined && !showForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex flex-wrap gap-1.5 justify-end mt-2"
                    >
                      {predefinedQuestions.map((q, i) => (
                        <motion.button key={i} onClick={() => sendMessage(q)}
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          className="px-3 py-1.5 rounded-full text-[11.5px] font-medium cursor-pointer transition-colors duration-150"
                          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.muted }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.accent}50`; e.currentTarget.style.color = C.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                        >
                          {q}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* ── INPUT BAR ── */}
            {isQuestionMode && showInputBox && (
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={() => sendMessage()}
                loading={loading}
              />
            )}

            {/* ── BOTTOM TABS ── */}
            {!isQuestionMode && (
              <div className="flex flex-shrink-0" style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}>
                <NavTab id="home"  label="Home"      icon={Home}          active={activeTab === "home"}  onClick={setActiveTab} />
                <NavTab id="chat"  label="Chats"     icon={MessageCircle} active={activeTab === "chat"}  onClick={setActiveTab} />
                <NavTab id="help"  label="Resources" icon={HelpCircle}    active={activeTab === "help"}  onClick={setActiveTab} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
