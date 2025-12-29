import { useState } from "react";

export default function WebaurixChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await res.json();
      const botMsg = { role: "bot", text: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Server error. Backend running ha?" }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-[380px] bg-slate-950 rounded-2xl shadow-xl flex flex-col">
        <div className="p-4 text-center text-sky-400 font-semibold border-b border-slate-800">
          Webaurix AI Assistant
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-3 py-2 rounded-xl ${
                msg.role === "user"
                  ? "ml-auto bg-sky-500 text-slate-900"
                  : "mr-auto bg-slate-800 text-slate-200"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-slate-800 text-slate-400 px-3 py-2 rounded-xl">
              Typing...
            </div>
          )}
        </div>

        <div className="flex border-t border-slate-800">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 bg-transparent px-3 py-3 text-slate-200 outline-none"
          />
          <button
            onClick={sendMessage}
            className="px-4 text-sky-400 font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
