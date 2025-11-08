/**
 * Main App Initialization
 */
import { router } from "./router/router.js";
import { dataService } from "./services/data-service.js";
import {
  createNavigation,
  updateActiveNav,
  initMobileNavToggle,
  calculateNavLineWidth,
} from "./components/navigation.js";
import { renderHome } from "./pages/home.js";
import { renderDestination } from "./pages/destination.js";
import { renderCrew } from "./pages/crew.js";
import { renderTechnology } from "./pages/technology.js";
import { renderNotFound } from "./pages/not-found.js";

/**
 * Update body class based on current route
 * @param {string} path - Current route path
 */
function updateBodyClass(path) {
  const body = document.body;

  // Remove all page classes
  body.classList.remove(
    "home",
    "destination",
    "crew",
    "technology",
    "not-found"
  );

  // Determine page class from path
  if (path === "/") {
    body.classList.add("home");
  } else if (path.startsWith("/destination")) {
    body.classList.add("destination");
  } else if (path.startsWith("/crew")) {
    body.classList.add("crew");
  } else if (path.startsWith("/technology")) {
    body.classList.add("technology");
  } else {
    body.classList.add("not-found");
  }
}

/**
 * Initialize the application
 */
export async function initApp() {
  // Load data first
  try {
    await dataService.load();
  } catch (error) {
    console.error("Failed to load data:", error);
    document.getElementById("main-content").innerHTML = `
      <main class="flow">
        <h1>Error loading data</h1>
        <p>Please refresh the page.</p>
      </main>
    `;
    return;
  }

  // Create navigation
  const header = document.querySelector("header");
  if (header) {
    const nav = createNavigation();
    header.appendChild(nav);
    // Initialize mobile navigation toggle
    initMobileNavToggle();
    // Calculate navigation line width
    calculateNavLineWidth();
  }

  // Wrap route handlers to update navigation and body class
  const wrapRouteHandler = (handler) => {
    return async (params) => {
      await handler(params);
      const currentRoute = router.getCurrentRoute();
      if (currentRoute) {
        updateBodyClass(currentRoute.path);
        updateActiveNav(currentRoute.path);
      }
    };
  };

  // Set up routes with wrapped handlers
  router.addRoute("/", wrapRouteHandler(renderHome));
  router.addRoute("/destination/:name", wrapRouteHandler(renderDestination));
  router.addRoute("/crew/:role", wrapRouteHandler(renderCrew));
  router.addRoute("/technology/:name", wrapRouteHandler(renderTechnology));
  router.setNotFound(wrapRouteHandler(renderNotFound));

  // Initialize router
  router.init();
}
