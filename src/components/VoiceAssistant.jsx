import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LiquidChrome from "./LiquidChrome";
import { voiceCommands } from "../utils/voiceCommands";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const recognitionRef = useRef(null);
  const welcomeSpoken = useRef(false);
  const timeoutRef = useRef(null);

  // ✅ Voice Output
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // ✅ Voice Recognition Setup
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommand(command);
      };

      recognition.onend = () => {
        setListening(false);
        clearTimeout(timeoutRef.current);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  // ✅ Handle Commands
  const handleCommand = (command) => {
    setMessage(`You said: "${command}"`);
    const commands = voiceCommands(speak, setChatbotVisible);

    const action = Object.entries(commands).find(([key]) =>
      command.includes(key)
    );

    if (action) {
      action[1]();
    } else {
      speak("Sorry, I didn't understand that command.");
    }
  };

  // ✅ Start Listening
  const startListening = () => {
    if (!recognitionRef.current) return;
    setPopup(true);
    setListening(true);

    // Speak welcome only once
    if (!welcomeSpoken.current) {
      speak("Hey, welcome to Webaurix. How can I help you?");
      welcomeSpoken.current = true;
    }

    recognitionRef.current.start();
    setMessage("🎧 Listening...");

    // Auto timeout after 30s if user silent
    timeoutRef.current = setTimeout(() => {
      if (listening) {
        speak("Failed to listen. Please tap the sphere to retry.");
        setMessage("❌ Failed to listen. Tap the sphere to retry.");
        setListening(false);
      }
    }, 30000);
  };

  // ✅ Stop Listening
  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setPopup(false);
    setListening(false);
    clearTimeout(timeoutRef.current);
  };

  // ✅ Restart Listening on Sphere Click
  const restartListening = () => {
    if (!listening) startListening();
  };

  return (
    <>
      {/* 🎤 Floating Start Button */}
      <motion.button
        onClick={startListening}
        className="fixed bottom-5 left-5 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        whileTap={{ scale: 0.9 }}
      >
        🎤
      </motion.button>

      {/* 🧠 Voice Interface Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex flex-col justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ❌ Close Button */}
            <div className="absolute top-6 right-6">
              <button
                onClick={stopListening}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full cursor-pointer"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* 🌐 Liquid Sphere */}
            <motion.div
              className="relative flex justify-center items-center cursor-pointer"
              onClick={restartListening}
              animate={{
                scale: listening ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="relative w-52 h-52 rounded-full border-2 border-[#036988] overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.6)]">
                <LiquidChrome
                  baseColor={[0.0078, 0.3294, 0.4157]}
                  speed={0.4}
                  amplitude={0.4}
                  frequencyX={2}
                  frequencyY={3}
                  interactive={true}
                  className="w-full h-full rounded-full"
                />
              </div>
            </motion.div>

            {/* 💬 Text Section */}
            <div className="mt-10 text-center text-white space-y-3 px-6">
              <motion.p
                className={`text-lg ${
                  listening ? "text-blue-200 animate-pulse" : "text-gray-300"
                }`}
              >
                {message || "🎧 Listening..."}
              </motion.p>
              {!listening && message.includes("retry") && (
                <p className="text-sm text-blue-300 animate-pulse mt-2">
                  🔁 Tap the glowing sphere to start listening again.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 Chatbot Popup */}
      <AnimatePresence>
        {chatbotVisible && (
          <motion.div
            className="fixed bottom-24 right-5 bg-white shadow-2xl rounded-2xl p-5 w-80 sm:w-96 border z-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Chat Assistant</h3>
              <button onClick={() => setChatbotVisible(false)}>
                <X size={22} className="text-gray-500 hover:text-black" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
              👋 Hi there! How can I help you today?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌪️ Spin Animation */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
};

export default VoiceAssistant;
