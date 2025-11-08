import "./styles/main.css";
import logoUrl from "./assets/shared/logo.svg";
import { initApp } from "./app.js";

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

const logoImg = document.querySelector("[data-logo]");
if (logoImg) {
  logoImg.src = logoUrl;
}

const favicon = document.getElementById("app-favicon");
if (favicon) {
  favicon.href = logoUrl;
}
