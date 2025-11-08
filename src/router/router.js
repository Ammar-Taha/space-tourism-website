/**
 * Router
 * Handles client-side routing using History API
 */
class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.notFoundHandler = null;
    // Get base path from Vite (strips trailing slash)
    this.base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  }

  /**
   * Add a route
   * @param {string} path - Route path (supports :param syntax)
   * @param {Function} handler - Handler function
   */
  addRoute(path, handler) {
    this.routes.push({
      pattern: this.pathToRegex(path),
      handler,
      path,
    });
  }

  /**
   * Set 404 handler
   */
  setNotFound(handler) {
    this.notFoundHandler = handler;
  }

  /**
   * Convert path pattern to regex
   * @param {string} path - Route path with :param syntax
   * @returns {RegExp}
   */
  pathToRegex(path) {
    const pattern = path.replace(/\//g, "\\/").replace(/:(\w+)/g, "([^/]+)");
    return new RegExp(`^${pattern}$`);
  }

  /**
   * Extract params from path
   * @param {string} pathPattern - Original path pattern
   * @param {string} actualPath - Actual path
   * @returns {Object}
   */
  extractParams(pathPattern, actualPath) {
    const params = {};
    const paramNames = [];
    const regex = /:(\w+)/g;
    let match;

    while ((match = regex.exec(pathPattern)) !== null) {
      paramNames.push(match[1]);
    }

    const pattern = this.pathToRegex(pathPattern);
    const matches = actualPath.match(pattern);

    if (matches) {
      paramNames.forEach((name, index) => {
        params[name] = matches[index + 1];
      });
    }

    return params;
  }

  /**
   * Get current path (strips base path)
   */
  getCurrentPath() {
    let pathname = window.location.pathname;
    // Remove base path if present
    if (this.base && pathname.startsWith(this.base)) {
      pathname = pathname.slice(this.base.length);
    }
    return pathname.replace(/\/$/, "") || "/";
  }

  /**
   * Navigate to a route
   * @param {string} path - Path to navigate to
   */
  navigate(path) {
    const currentPath = this.getCurrentPath();
    if (path === currentPath) {
      return;
    }

    // Add base path for navigation
    const fullPath = this.base + path;
    window.history.pushState({}, "", fullPath);
    this.handleRoute();
  }

  /**
   * Handle current route
   */
  async handleRoute() {
    const path = this.getCurrentPath();

    for (const route of this.routes) {
      const matches = path.match(route.pattern);
      if (matches) {
        const params = this.extractParams(route.path, path);
        this.currentRoute = { path, params };
        await route.handler(params);
        return;
      }
    }

    // No route matched
    if (this.notFoundHandler) {
      this.currentRoute = { path, params: {} };
      await this.notFoundHandler();
    }
  }

  /**
   * Initialize router
   */
  init() {
    // Handle initial route
    this.handleRoute();

    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    // Handle link clicks
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        let path = new URL(link.href).pathname;
        // Remove base path if present
        if (this.base && path.startsWith(this.base)) {
          path = path.slice(this.base.length);
        }
        this.navigate(path);
      }
    });
  }

  /**
   * Get current route info
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Export singleton instance
export const router = new Router();
