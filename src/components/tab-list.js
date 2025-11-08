/**
 * Tab List Component
 * Creates tab indicators for destinations
 */
export function createTabList(items, onSelect, selectedIndex = 0) {
  const container = document.createElement("div");
  container.className = "tab-list underline-indicators flex";

  items.forEach((item, index) => {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.className = "uppercase ff-sans-cond text-accent letter-spacing-2";
    button.style.backgroundColor = "transparent";
    button.setAttribute("aria-selected", index === selectedIndex);
    button.setAttribute("role", "tab");
    button.setAttribute("tabindex", index === selectedIndex ? "0" : "-1");

    button.addEventListener("click", () => {
      onSelect(index);
      updateTabList(container, index);
    });

    container.appendChild(button);
  });

  return container;
}

/**
 * Update active tab in tab list
 */
export function updateTabList(container, selectedIndex) {
  const tabs = container.querySelectorAll("button");
  tabs.forEach((tab, index) => {
    const isSelected = index === selectedIndex;
    tab.setAttribute("aria-selected", isSelected);
    tab.setAttribute("tabindex", isSelected ? "0" : "-1");
  });
}
