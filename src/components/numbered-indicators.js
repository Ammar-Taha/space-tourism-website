/**
 * Numbered Indicators Component
 * Creates numbered indicators for technology items
 */
export function createNumberedIndicators(count, onSelect, selectedIndex = 0) {
  const container = document.createElement('div');
  container.className = 'numbered-indicators flex';

  for (let i = 0; i < count; i++) {
    const button = document.createElement('button');
    button.textContent = i + 1;
    button.className = 'ff-serif';
    button.setAttribute('aria-selected', i === selectedIndex);
    button.setAttribute('aria-label', `Select item ${i + 1}`);
    button.setAttribute('role', 'tab');
    button.setAttribute('tabindex', i === selectedIndex ? '0' : '-1');

    button.addEventListener('click', () => {
      onSelect(i);
      updateNumberedIndicators(container, i);
    });

    container.appendChild(button);
  }

  return container;
}

/**
 * Update active numbered indicator
 */
export function updateNumberedIndicators(container, selectedIndex) {
  const indicators = container.querySelectorAll('button');
  indicators.forEach((indicator, index) => {
    const isSelected = index === selectedIndex;
    indicator.setAttribute('aria-selected', isSelected);
    indicator.setAttribute('tabindex', isSelected ? '0' : '-1');
  });
}

