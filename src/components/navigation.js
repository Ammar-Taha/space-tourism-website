/**
 * Navigation Component
 * Handles primary navigation
 */
export function createNavigation() {
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Primary navigation");

  const ul = document.createElement("ul");
  ul.className = "primary-navigation underline-indicators flex";
  ul.id = "primary-navigation";

  const links = [
    { href: "/", label: "Home", number: "00" },
    { href: "/destination/moon", label: "Destination", number: "01" },
    { href: "/crew/commander", label: "Crew", number: "02" },
    { href: "/technology/launch-vehicle", label: "Technology", number: "03" },
  ];

  links.forEach((link) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.innerHTML = `<span aria-hidden="true">${link.number}</span>${link.label}`;
    anchor.className = "ff-sans-cond uppercase text-white letter-spacing-2";
    listItem.appendChild(anchor);
    ul.appendChild(listItem);
  });

  nav.appendChild(ul);
  return nav;
}

/**
 * Update active navigation link
 */
export function updateActiveNav(currentPath) {
  const navItems = document.querySelectorAll(".primary-navigation li");
  navItems.forEach((listItem) => {
    const anchor = listItem.querySelector("a");
    const linkPath = new URL(anchor.href).pathname;
    // Check if current path matches the link's base path
    const isActive =
      currentPath === linkPath ||
      (currentPath.startsWith("/destination") &&
        linkPath.startsWith("/destination")) ||
      (currentPath.startsWith("/crew") && linkPath.startsWith("/crew")) ||
      (currentPath.startsWith("/technology") &&
        linkPath.startsWith("/technology"));

    if (isActive) {
      listItem.classList.add("active");
      anchor.setAttribute("aria-selected", "true");
    } else {
      listItem.classList.remove("active");
      anchor.removeAttribute("aria-selected");
    }
  });
}

/**
 * Calculate and set navigation line width based on logo position
 */
export function calculateNavLineWidth() {
  const logo = document.querySelector(".logo");
  const nav = document.getElementById("primary-navigation");

  if (!logo || !nav) return;

  const updateLineWidth = () => {
    const logoRect = logo.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    // The line extends leftward from the nav's left edge (right: 100%)
    // Calculate distance from nav's left edge to logo's left edge
    // Use 75% of the total distance to occupy most of the space
    const distance = navRect.left - logoRect.left; // Distance from logo's left to nav's left
    const lineWidth = Math.max(0, distance * 0.75); // 75% of the total distance, minimum 0

    // Set CSS variable for the line width (CSS media query handles visibility)
    nav.style.setProperty("--nav-line-width", `${lineWidth}px`);
  };

  // Calculate on initial load (wait for next frame to ensure layout is ready)
  requestAnimationFrame(updateLineWidth);

  // Recalculate on window resize (using requestAnimationFrame for smooth updates)
  let rafId;
  window.addEventListener("resize", () => {
    // Cancel any pending animation frame
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    // Schedule update for next frame (smooth and fast)
    rafId = requestAnimationFrame(() => {
      updateLineWidth();
      rafId = null;
    });
  });
}

/**
 * Initialize mobile navigation toggle
 */
export function initMobileNavToggle() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.getElementById("primary-navigation");
  const toggleSpan = toggle?.querySelector("span");

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.removeAttribute("data-visible");
    toggle.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", "false");
    if (toggleSpan) {
      toggleSpan.setAttribute("aria-expanded", "false");
      toggleSpan.textContent = "Menu";
    }
  };

  const openNav = () => {
    nav.setAttribute("data-visible", "true");
    toggle.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    if (toggleSpan) {
      toggleSpan.setAttribute("aria-expanded", "true");
      toggleSpan.textContent = "Close";
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.hasAttribute("data-visible");

    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close navigation when clicking on a link (mobile only)
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 560) {
        // Only close on mobile (35rem = 560px)
        closeNav();
      }
    });
  });
}
