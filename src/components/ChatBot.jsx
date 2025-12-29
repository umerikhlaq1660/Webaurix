import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  BotOff,
  Home,
  MessageCircle,
  HelpCircle,
  X,
  Send,
  MoreVertical,
  ArrowLeft,
  AlertCircle,
  Plus,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import icon from "../assets/Logoicon.png";
import customAnswers from "../data/customAnswers";
import keywordAnswers from "../data/keywordAnswers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import stringSimilarity from "string-similarity"; // fuzzy matching

const initialForm = {
  firstName: "",
  email: "",
  phoneNumber: "",
  quries: "",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isQuestionMode, setIsQuestionMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showInputBox, setShowInputBox] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showPredefined, setShowPredefined] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  const messagesEndRef = useRef(null);
  const formRef = useRef(null);

  // GREETING POPUP on page load 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2000); // show after 2 sec

    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000); 

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  //  Close greeting if chat opens 
  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  // Load chat history
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) setChatHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    if (currentChatId) {
      const savedMessages = localStorage.getItem(`chatMessages_${currentChatId}`);
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    }
  }, [currentChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (currentChatId)
      localStorage.setItem(`chatMessages_${currentChatId}`, JSON.stringify(messages));
  }, [messages, currentChatId]);

  const TypingAnimation = () => (
    <div className="flex space-x-1 items-center ml-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  );

  const predefinedQuestions = [
    "I have questions about pricing",
    "I have questions about my invoice",
    "I'm looking for support",
    "I am a developer trying to learn more",
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

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  //  FUZZY MATCH FUNCTION 
  const getFuzzyAnswer = (text) => {
    const allAnswers = [...keywordAnswers];
    let bestMatch = { score: 0, answer: "" };
    allAnswers.forEach((item) => {
      item.keywords.forEach((kw) => {
        const similarity = stringSimilarity.compareTwoStrings(
          text.toLowerCase(),
          kw.toLowerCase()
        );
        if (similarity > bestMatch.score) {
          bestMatch = { score: similarity, answer: item.answer };
        }
      });
    });
    return bestMatch.score >= 0.3 ? bestMatch.answer : null;
  };

  //  SEND MESSAGE FUNCTION 
  const sendMessage = async (customMsg) => {
    const text = (customMsg || input).trim();
    if (!text || loading) return;
    if (!isQuestionMode) setIsQuestionMode(true);
    if (activeTab !== "chat") setActiveTab("chat");

    const userMsg = { role: "user", content: text, time: formatTime() };
    setInput("");
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      userMsg,
      { role: "assistant", content: "__typing__", time: "" },
    ]);
    setShowPredefined(false);

    setTimeout(() => {
      const handleResponse = (answer) => {
        const assistantMsg = {
          role: "assistant",
          content: answer,
          time: formatTime(),
        };
        setMessages((prev) => [
          ...prev.filter((m) => m.content !== "__typing__"),
          assistantMsg,
        ]);
        setChatHistory((prev) => {
          if (currentChatId) {
            return prev.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    lastMsg:
                      answer.split("\n")[0].slice(0, 60) +
                      (answer.length > 60 ? "..." : ""),
                    time: formatTime(),
                  }
                : chat
            );
          } else {
            const newEntry = {
              id: Date.now(),
              botName: "WebaurixBot",
              lastMsg:
                answer.split("\n")[0].slice(0, 60) +
                (answer.length > 60 ? "..." : ""),
              time: formatTime(),
            };
            setCurrentChatId(newEntry.id);
            return [...prev, newEntry];
          }
        });
        setShowNotice(true);
        setShowInputBox(true);
        setShowForm(false);
        setLoading(false);
      };

      if (text.toLowerCase() === "something else") {
        handleResponse("You can ask any question here. How can I help?");
        return;
      }

      const matchedKey = Object.keys(customAnswers).find(
        (key) => key.toLowerCase() === text.toLowerCase()
      );
      if (matchedKey) {
        handleResponse(customAnswers[matchedKey]);
        return;
      }

      const fuzzyAnswer = getFuzzyAnswer(text);
      if (fuzzyAnswer) {
        handleResponse(fuzzyAnswer);
        return;
      }

      handleResponse(
        "Our team is currently unavailable. Please provide your details below so we can contact you:"
      );
      setShowForm(true);
    }, 1500);
  };

  // FORM HANDLING 
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "This field is required";
    if (!formData.email.trim()) newErrors.email = "This field is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "This field is required";
    if (!formData.quries.trim()) newErrors.quries = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID_NEW;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_NEW;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_NEW;
      const templateParams = {
        name: formData.firstName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        quries: formData.quries,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setShowForm(false);
      const successMsg = {
        role: "assistant",
        content: `**${formData.firstName}**, your message **"${formData.quries}"** has been sent successfully. Our team will contact you soon.`,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, successMsg]);
      setFormData(initialForm);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
          time: formatTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const startNewChat = () => {
    const newId = Date.now();
    const firstBotMsg = { role: "assistant", content: "__typing__", time: "" };
    setCurrentChatId(newId);
    setMessages([firstBotMsg]);
    setChatHistory((prev) => [
      ...prev,
      {
        id: newId,
        botName: "WebaurixBot",
        lastMsg: "Hi there! What brings you here today?",
        time: formatTime(),
      },
    ]);
    setIsQuestionMode(true);
    setShowPredefined(false);
    setShowInputBox(false);
    setShowForm(false);
    setTimeout(() => {
      const botMsg = {
        role: "assistant",
        content: "Hi there! What brings you here today?",
        time: formatTime(),
      };
      setMessages([botMsg]);
      setShowPredefined(true);
      setShowInputBox(true);
      setShowNotice(true);
    }, 1500);
  };

  const deleteAllChats = () => {
    setDeletingAll(true);
    setTimeout(() => {
      setChatHistory([]);
      setCurrentChatId(null);
      setMessages([]);
      localStorage.clear();
      setDeletingAll(false);
      setDropdownOpen(false);
    }, 1500);
  };

  const knowledgeBase = [
    { title: "Client Onboarding", link: "https://www.youtube.com/yourcompany1" },
    { title: "Website Tutorials", link: "https://www.youtube.com/yourcompany2" },
    { title: "Product Guides", link: "https://www.youtube.com/yourcompany3" },
    { title: "FAQ Walkthrough", link: "https://www.youtube.com/yourcompany4" },
  ];

  const resources = [
    { title: "Book a Consultation", link: "https://calendly.com/umerikhlaq1660/30min" },
    { title: "View Portfolio", link: "https://webaurix.com/portfolio" },
    { title: "Webaurix AI", link: "https://ai.webaurix.com/" },
    { title: "Webaurix Blogs", link: "https://www.webaurix.com/blogs" },
  ];

  //  JSX 
  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-4 z-50 py-4 px-4 rounded-2xl shadow-lg cursor-pointer bg-[#036988] text-white"
      >
        {isOpen ? <BotOff className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </motion.button>

      {/* Greeting Popup */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-22 right-6 z-50 bg-white border border-[#036988]/30 shadow-lg rounded-xl px-4 py-3 text-sm text-gray-800 w-[220px]"
          >
            <span className="font-semibold text-[#036988]">Hi there!</span> Need help?  
            <p className="text-xs text-gray-500 mt-1">Click the chat button to start talking.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 w-[90%] sm:w-[400px] md:w-[420px] h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* HEADER */}
            <div className="bg-[#036988] text-white flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                {isQuestionMode && (
                  <button
                    onClick={() => setIsQuestionMode(false)}
                    className="p-1 hover:bg-[#02576b] rounded-full"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <img
                  src={icon}
                  alt="Bot"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <div>
                  <p className="font-semibold text-sm">Webaurix Assistant</p>
                  <p className="text-xs text-gray-200">Here to assist you</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                {activeTab === "chat" && (
                  <div>
                    <MoreVertical
                      className="cursor-pointer"
                      size={18}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                        <button
                          onClick={deleteAllChats}
                          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          {deletingAll ? (
                            <Loader className="animate-spin w-4 h-4" />
                          ) : null}
                          Delete All Chat History
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <X
                  onClick={() => setIsOpen(false)}
                  size={18}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Chat Body */}
            {/* Chat Body */}
            <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {!isQuestionMode ? (
                <>
                  {activeTab === "home" && (
                    <div className="flex flex-col items-center text-center mt-6">
                      <img src={icon} alt="Logo" className="w-20 h-20 rounded-full mb-3" />
                      <h3 className="font-semibold text-gray-800 text-3xl">Welcome to Webaurix Assistant</h3>
                      <p className="text-gray-600 text-sm mt-2">We’re here to assist you with your queries.</p>

                      <div className="mt-6 w-full">
                        <h4 className="font-semibold text-gray-700 text-sm mb-3 text-left px-2">Frequently Asked Questions</h4>
                        <div className="flex flex-col gap-2">
                          {faqQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => sendMessage(q)}
                              className="text-left px-3 py-2 bg-white text-[#036988] border border-[#036988]/40 rounded-sm shadow-sm hover:bg-[#036988]/10 text-sm w-full cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "chat" && (
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-y-auto space-y-3 mt-3 scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                        {chatHistory.length === 0 ? (
                          <div className="flex flex-col items-center justify-center mt-50 text-gray-500">
                            <MessageCircle size={50} className="opacity-60 mb-3" />
                            <p className="text-2xl text-gray-600 ">No Messages Yet</p>
                            <p className="text-sm text-gray-500">Messages from the team will appear here</p>
                          </div>
                        ) : (
                          chatHistory.map((chat) => (
                            <div
                              key={chat.id}
                              className="flex items-center gap-3 bg-gray-50 p-3 overflow-clip rounded-xl shadow-sm border border-[#61acdd] hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setCurrentChatId(chat.id);
                                const chatMessages = localStorage.getItem(`chatMessages_${chat.id}`);
                                if (chatMessages) setMessages(JSON.parse(chatMessages));
                                setIsQuestionMode(true);
                                setShowPredefined(true);
                                setShowInputBox(true);
                                setShowForm(false);
                              }}
                            >
                              <img src={logo} alt="Bot" className="w-10 h-10 rounded-full border border-gray-200" />
                              <div className="flex flex-col flex-1">
                                <p className="font-semibold text-sm text-gray-800">{chat.botName}</p>
                                <p className="text-xs text-gray-600 truncate">{chat.lastMsg}</p>
                                <span className="text-[10px] text-gray-400 mt-1">{chat.time}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-4 bg-white border-t mt-auto flex justify-center">
                        <button
                          onClick={startNewChat}
                          className="flex items-center gap-2 bg-[#036988] hover:bg-[#024d63] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md cursor-pointer"
                        >
                          <Plus size={16} /> Ask a Question
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "help" && (
                    <div className="flex flex-col gap-6 mt-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Knowledge Base & Tutorials</h3>
                        <div className="flex flex-col gap-2">
                          {knowledgeBase.map((item, idx) => (
                            <div key={idx} className="p-3 border rounded-md hover:bg-gray-50">
                              <p className="font-medium text-gray-800">{item.title}</p>
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-[#036988] hover:underline">
                                Watch on YouTube
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Company Resources</h3>
                        <div className="flex flex-col gap-2">
                          {resources.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 border rounded-md hover:bg-gray-50 text-[#036988] font-medium"
                            >
                              {res.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  {showNotice && showInputBox && (
                    <div className="bg-[#f8fafc] text-[#036988] text-xs p-2 rounded-md flex items-center gap-2 border border-[#036988]/30">
                      <AlertCircle size={14} className="text-[#036988]" />
                      <span>This chat session is recorded and may be monitored or reviewed by Webaurix.</span>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[80%] ${msg.role === "user" ? "self-end" : "self-start"}`}
                    >
                      <div className={`p-2 rounded-2xl text-sm shadow-md ${
                        msg.role === "user" ? "bg-[#036988] text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}>
                        {msg.content === "__typing__" ? <TypingAnimation /> : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                        <p className="text-[10px] text-gray-400 mt-1 text-right">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}

                  {showForm && (
                    <form ref={formRef} onSubmit={handleFormSubmit} className="bg-gray-50 p-3 rounded-xl shadow-sm space-y-3 mt-3 border border-gray-200">
                      <input type="text" name="firstName" placeholder="Your Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 text-sm border rounded-md outline-none" />
                      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 text-sm border rounded-md outline-none" />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      <div className="border rounded-md">
                        <PhoneInput country={"pk"} value={formData.phoneNumber} onChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))} inputClass="!w-full !text-sm !p-2 !rounded-md !border-none" />
                      </div>
                      {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                      <textarea name="quries" placeholder="Write your query..." value={formData.quries} onChange={handleChange} rows="3" className="w-full p-2 text-sm border rounded-md outline-none resize-none" />
                      {errors.quries && <p className="text-red-500 text-xs">{errors.quries}</p>}
                      <button type="submit" disabled={loading} className="w-full bg-[#036988] hover:bg-[#02576b] text-white py-2 rounded-md text-sm font-medium">{loading ? "Sending..." : "Submit"}</button>
                    </form>
                  )}

                  {showPredefined && !showForm && (
                    <motion.div className="flex flex-col items-end gap-2 mt-10" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                      {predefinedQuestions.map((q, idx) => (
                        <motion.button key={idx} onClick={() => sendMessage(q)} whileHover={{ scale: 1.05 }} className="px-3 py-2 bg-white text-[#036988] border border-[#036988]/40 rounded-full shadow-sm hover:bg-[#036988]/10 text-sm w-fit cursor-pointer">{q}</motion.button>
                      ))}
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {isQuestionMode && showInputBox && (
              <div className="p-3 border-t bg-white flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 border rounded-xl p-2 text-sm outline-none" />
                <button onClick={() => sendMessage()} disabled={loading} className="bg-[#036988] text-white p-2 rounded-xl">
                  <Send size={16} />
                </button>
              </div>
            )}

            {!isQuestionMode && (
              <div className="border-t flex justify-around bg-white py-2">
                <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center text-sm cursor-pointer ${activeTab === "home" ? "text-[#036988]" : "text-gray-500"}`}>
                  <Home size={20} /> Home
                </button>
                <button onClick={() => setActiveTab("chat")} className={`flex flex-col items-center text-sm cursor-pointer ${activeTab === "chat" ? "text-[#036988]" : "text-gray-500"}`}>
                  <MessageCircle size={20} /> Chat
                </button>
                <button onClick={() => setActiveTab("help")} className={`flex flex-col items-center text-sm cursor-pointer ${activeTab === "help" ? "text-[#036988]" : "text-gray-500"}`}>
                  <HelpCircle size={20} /> Help
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
