import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

/* Fade out the instant HTML splash once React has painted */
const hideSplash = () => {
  const s = document.getElementById("splash");
  if (!s) return;
  s.classList.add("splash-hide");
  setTimeout(() => s.remove(), 650);
};
// wait for the app's first paint then hide immediately
requestAnimationFrame(() =>
  requestAnimationFrame(() => setTimeout(hideSplash, 80))
);
