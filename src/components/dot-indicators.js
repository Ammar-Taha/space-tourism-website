/**
 * Dot Indicators Component
 * Creates dot indicators for crew members
 */
export function createDotIndicators(count, onSelect, selectedIndex = 0) {
  const container = document.createElement('div');
  container.className = 'dot-indicators flex';

  for (let i = 0; i < count; i++) {
    const button = document.createElement('button');
    button.setAttribute('aria-selected', i === selectedIndex);
    button.setAttribute('aria-label', `Select item ${i + 1}`);
    button.setAttribute('role', 'tab');
    button.setAttribute('tabindex', i === selectedIndex ? '0' : '-1');

    button.addEventListener('click', () => {
      onSelect(i);
      updateDotIndicators(container, i);
    });

    container.appendChild(button);
  }

  return container;
}

/**
 * Update active dot in dot indicators
 */
export function updateDotIndicators(container, selectedIndex) {
  const dots = container.querySelectorAll('button');
  dots.forEach((dot, index) => {
    const isSelected = index === selectedIndex;
    dot.setAttribute('aria-selected', isSelected);
    dot.setAttribute('tabindex', isSelected ? '0' : '-1');
  });
}

