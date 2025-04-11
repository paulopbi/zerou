//css
import "./styles/global.css";
import "./styles/reset.css";
import "./styles/utility.css";
//react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//page
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
