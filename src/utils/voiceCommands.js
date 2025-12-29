export const voiceCommands = (speak, setChatbotVisible) => ({
  "open web development": () => {
    speak("Opening Web Development page");
    window.location.href = "/services/web-development";
  },
  "open about": () => {
    speak("Opening About Us page");
    window.location.href = "/about";
  },
  "open contact": () => {
    speak("Opening Contact page");
    window.location.href = "/contact";
  },
  "open home": () => {
    speak("Opening Home page");
    window.location.href = "/";
  },
  "open chat": () => {
    speak("Opening chat assistant");
    setChatbotVisible(true);
  },
  "open chatbot": () => {
    speak("Opening chat assistant");
    setChatbotVisible(true);
  },
  "talk": () => {
    speak("Opening chat assistant");
    setChatbotVisible(true);
  },
});
