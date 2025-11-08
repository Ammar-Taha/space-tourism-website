# Space Tourism Website - Architecture Documentation

## 📁 File Structure

```
3- The App/
├── ARCHITECTURE.md               # Architecture reference (this file)
├── index.html                    # SPA host document
├── package-lock.json             # Locked dependency graph
├── package.json                  # Dependencies and scripts
├── public/                       # Static public assets served as-is
│   └── vite.svg
├── vite.config.js                # Vite configuration
└── src/
    ├── app.js                    # App initialization & routing setup
    ├── data.json                 # Centralized data source
    ├── main.js                   # JavaScript entry; bootstraps app
    ├── assets/                   # Images and static assets
    │   ├── crew/
    │   ├── destination/
    │   ├── home/
    │   ├── shared/
    │   └── technology/
    ├── components/               # Reusable UI components
    │   ├── dot-indicators.js
    │   ├── navigation.js
    │   ├── numbered-indicators.js
    │   └── tab-list.js
    ├── pages/                    # Page modules (views)
    │   ├── crew.js
    │   ├── destination.js
    │   ├── home.js
    │   ├── not-found.js
    │   └── technology.js
    ├── router/                   # Routing logic
    │   └── router.js
    ├── services/                 # Business logic & data management
    │   └── data-service.js
    └── styles/                   # Layered CSS entry points
        ├── base.css              # Base element styles & layout tokens
        ├── components.css        # Reusable component styles
        ├── main.css              # Page-specific overrides (imports all)
        └── modern-css-reset.css  # Additional CSS reset
```

---

## 🔄 How Everything Works Together

### Example: Following the Destination Page Flow

#### 1. **Application Initialization** (`src/main.js` → `src/app.js`)

```javascript
// main.js loads styles and initializes app
import "normalize.css";
import "./styles/main.css";
import { initApp } from "./app.js";
initApp();
```

#### 2. **Data Loading** (`src/app.js`)

```javascript
// app.js loads data first
await dataService.load();  // Fetches and parses data.json
```

#### 3. **Route Setup** (`src/app.js`)

```javascript
// Routes are registered with handlers
router.addRoute('/destination/:name', wrapRouteHandler(renderDestination));
```

#### 4. **Navigation** (User clicks "Destination" link)

```javascript
// navigation.js creates links like:
<a href="/destination/moon">Destination</a>

// Router intercepts click (router.js)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (link) {
    e.preventDefault();
    router.navigate('/destination/moon');  // Updates URL without reload
  }
});
```

#### 5. **Route Matching** (`src/router/router.js`)

```javascript
// Router matches pattern '/destination/:name' with '/destination/moon'
// Extracts params: { name: 'moon' }
router.handleRoute();  // Finds matching route and calls handler
```

#### 6. **Page Rendering** (`src/pages/destination.js`)

```javascript
export async function renderDestination(params) {
  // 1. Get data from service
  const destinations = dataService.getDestinations();
  const destination = dataService.getDestination(params.name); // 'moon'
  
  // 2. Create tab list component
  const tabList = createTabList(destinations, onSelect, selectedIndex);
  
  // 3. Render HTML to #app container
  container.innerHTML = `...HTML template...`;
  
  // 4. Insert interactive components
  container.querySelector('.tab-list-container').replaceWith(tabList);
}
```

#### 7. **Component Interaction** (`src/components/tab-list.js`)

```javascript
// When user clicks a tab:
button.addEventListener('click', () => {
  onSelect(index);  // Updates selected index
  router.navigate(`/destination/${name}`);  // Updates URL
  // Router re-renders page with new destination
});
```

#### 8. **Navigation Update** (`src/components/navigation.js`)

```javascript
// After route change, navigation highlights active link
updateActiveNav(currentPath);  // Adds aria-selected="true" to active link
```

---

## 🎯 Data Flow

```
data.json (Static JSON)
    ↓
data-service.js (Loads & parses)
    ↓
Pages (Get data via service methods)
    ↓
Components (Render UI with data)
    ↓
User Interaction
    ↓
Router (Updates URL)
    ↓
Pages (Re-render with new data)
```

---

## 🚀 How to Scale and Add More Pages

### Step 1: Add Data to `data.json`

```json
{
  "destinations": [...],
  "crew": [...],
  "technology": [...],
  "newSection": [  // Add your new data section
    {
      "id": "item1",
      "name": "Item One",
      "description": "..."
    }
  ]
}
```

### Step 2: Extend Data Service (`src/services/data-service.js`)

```javascript
class DataService {
  // ... existing methods ...

  /**
   * Get all new section items
   */
  getNewSection() {
    return this.data?.newSection || [];
  }

  /**
   * Get a new section item by id
   */
  getNewSectionItem(id) {
    return this.getNewSection().find(
      (item) => item.id === id
    );
  }
}
```

### Step 3: Create Page Module (`src/pages/new-section.js`)

```javascript
/**
 * New Section Page
 */
import { router } from '../router/router.js';
import { dataService } from '../services/data-service.js';
import { createTabList } from '../components/tab-list.js'; // Or appropriate indicator

export async function renderNewSection(params) {
  const container = document.getElementById('app');
  container.className = 'new-section';
  
  const items = dataService.getNewSection();
  const selectedItem = dataService.getNewSectionItem(params.id);
  
  // Create indicators (if needed)
  const indicators = createTabList(items, (index) => {
    const item = items[index];
    router.navigate(`/new-section/${item.id}`);
  }, selectedIndex);
  
  // Render page
  container.innerHTML = `
    <main id="main" class="grid-container grid-container--new-section flow">
      <h1 class="numbered-title">
        <span aria-hidden="true">04</span>New Section Title
      </h1>
      <!-- Your page content -->
    </main>
  `;
  
  // Insert indicators
  const indicatorsContainer = container.querySelector('.indicators-container');
  indicatorsContainer.replaceWith(indicators);
  
  // Update page title
  document.title = `Space Tourism | New Section - ${selectedItem.name}`;
}
```

### Step 4: Register Route (`src/app.js`)

```javascript
import { renderNewSection } from './pages/new-section.js';

// In initApp():
router.addRoute('/new-section/:id', wrapRouteHandler(renderNewSection));
```

### Step 5: Update Navigation (`src/components/navigation.js`)

```javascript
const links = [
  { href: '/', label: 'Home', number: '00' },
  { href: '/destination/moon', label: 'Destination', number: '01' },
  { href: '/crew/commander', label: 'Crew', number: '02' },
  { href: '/technology/launch-vehicle', label: 'Technology', number: '03' },
  { href: '/new-section/item1', label: 'New Section', number: '04' }, // Add here
];
```

### Step 6: Add Styles (`src/styles/main.css`)

```css
/* src/styles/main.css */
.new-section {
  /* Your page-specific styles */
}

.grid-container--new-section {
  /* Grid layout for new section */
}
```

### Step 7: Update Navigation Logic (`src/app.js`)

```javascript
// Ensure navigation highlighting works for new section
// The updateActiveNav function should already handle this if you use:
// currentPath.startsWith('/new-section')
```

---

## 📝 Component Patterns

### Indicator Components

Choose the appropriate indicator based on your needs:

- **Tab List** (`tab-list.js`): For destinations, categories with text labels
- **Dot Indicators** (`dot-indicators.js`): For crew, images, visual items
- **Numbered Indicators** (`numbered-indicators.js`): For numbered sequences, technology items

### Creating Custom Indicators

```javascript
// src/components/custom-indicator.js
export function createCustomIndicator(items, onSelect, selectedIndex = 0) {
  const container = document.createElement('div');
  container.className = 'custom-indicators flex';

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = item.label;
    button.setAttribute('aria-selected', index === selectedIndex);
    
    button.addEventListener('click', () => {
      onSelect(index);
      updateCustomIndicators(container, index);
    });
    
    container.appendChild(button);
  });

  return container;
}

function updateCustomIndicators(container, selectedIndex) {
  const indicators = container.querySelectorAll('button');
  indicators.forEach((indicator, index) => {
    indicator.setAttribute('aria-selected', index === selectedIndex);
  });
}
```

---

## 🎨 Styling Guidelines

### CSS Organization

1. **Reset Layer** (`normalize.css`, `src/styles/modern-css-reset.css`):
   - Normalizes default browser styles
   - Applies modern reset tweaks specific to the project

2. **Base Layer** (`src/styles/base.css`):
   - Defines CSS custom properties and foundational layout rules
   - Provides global typography defaults and utility helpers

3. **Components Layer** (`src/styles/components.css`):
   - Styles reusable UI building blocks (navigation, indicators, buttons)
   - Encapsulates component-specific states and interactions

4. **Pages Layer** (`src/styles/main.css`):
   - Imports all other style layers and defines page-level layouts
   - Applies responsive grid tweaks and background imagery per route

### CSS Layers

The project uses CSS `@layer` for proper cascade control:

```css
@layer reset, base, components, pages;
```

This ensures styles cascade in the correct order regardless of import order.

### Adding Page-Specific Styles

```css
/* src/styles/pages/pages.css */

/* Home Page */
.home {
  background-image: url('/src/assets/home/background-home-desktop.jpg');
  background-size: cover;
  background-position: center;
}

.grid-container--home {
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}

/* Destination Page */
.destination {
  background-image: url('/src/assets/destination/background-destination-desktop.jpg');
}

/* Add responsive styles */
@media (max-width: 768px) {
  .home {
    background-image: url('/src/assets/home/background-home-mobile.jpg');
  }
}
```

---

## 🔧 Router API

### Available Methods

```javascript
import { router } from './router/router.js';

// Navigate programmatically
router.navigate('/destination/mars');

// Get current route
const currentRoute = router.getCurrentRoute();
// Returns: { path: '/destination/moon', params: { name: 'moon' } }

// Get current path
const currentPath = router.getCurrentPath();
// Returns: '/destination/moon'
```

### Route Parameters

Routes support dynamic parameters with `:param` syntax:

```javascript
// Route definition
router.addRoute('/section/:id/:subId', handler);

// URL: /section/item1/subitem2
// Params: { id: 'item1', subId: 'subitem2' }
```

---

## 📊 Data Service API

```javascript
import { dataService } from './services/data-service.js';

// Load data (called automatically on app init)
await dataService.load();

// Get all destinations
const destinations = dataService.getDestinations();

// Get specific destination
const moon = dataService.getDestination('moon');

// Get all crew
const crew = dataService.getCrew();

// Get crew member by role or name
const commander = dataService.getCrewMember('commander');
const douglas = dataService.getCrewMember('Douglas Hurley');

// Get all technology
const technology = dataService.getTechnology();

// Get technology item
const launchVehicle = dataService.getTechnologyItem('Launch vehicle');
```

---

## 🐛 Debugging Tips

### Check Router State

```javascript
// In browser console
import { router } from './src/router/router.js';
console.log(router.getCurrentRoute());
console.log(router.routes);
```

### Check Data Service

```javascript
import { dataService } from './src/services/data-service.js';
console.log(dataService.data);
console.log(dataService.getDestinations());
```

### Verify Route Matching

```javascript
// Check if route pattern matches
const pattern = router.pathToRegex('/destination/:name');
console.log(pattern.test('/destination/moon')); // true
```

---

## 🚨 Common Issues & Solutions

### Issue: Route not matching

**Solution**: Check route pattern syntax. Ensure `:param` syntax is correct.

### Issue: Data not loading

**Solution**: 
- Verify `data.json` is in `src/`
- Check browser console for fetch errors
- Ensure paths in `data.json` are correct (use `/src/assets/...`)

### Issue: Navigation not highlighting

**Solution**: 
- Ensure `updateActiveNav()` is called after route change
- Check that navigation links match route patterns
- Verify `aria-selected` attribute is being set

### Issue: Component not rendering

**Solution**:
- Check that container exists before inserting
- Verify component is created before calling `replaceWith()`
- Ensure event listeners are attached after DOM insertion

---

## 📚 Best Practices

1. **Data Management**: Always use `dataService` methods instead of accessing `data.json` directly
2. **Routing**: Use router's `navigate()` method instead of `window.location`
3. **Components**: Create reusable components in `components/` folder
4. **Styles**: Use CSS layers and organize by concern (base, components, pages)
5. **Page Modules**: Each page should be self-contained and handle its own rendering
6. **Error Handling**: Always handle cases where data might not be loaded yet
7. **Accessibility**: Use proper ARIA attributes (`aria-selected`, `role="tab"`, etc.)

---

## 🔄 Development Workflow

1. **Add new data** → Update `data.json`
2. **Extend service** → Add getters to `data-service.js`
3. **Create page** → Add module in `pages/`
4. **Register route** → Add route in `app.js`
5. **Update navigation** → Add link in `navigation.js`
6. **Add styles** → Update `src/styles/main.css`
7. **Test** → Run `npm run dev` and test all routes

---

## 📦 Dependencies

- **Vite**: Build tool and dev server
- **normalize.css**: CSS reset
- **Modern CSS Reset**: Additional reset styles

---

## 🎯 Key Architecture Decisions

1. **Single Page Application (SPA)**: Better UX, faster navigation, shared state
2. **Vanilla JavaScript**: No framework dependencies, lightweight, fast
3. **History API Routing**: Clean URLs, browser back/forward support
4. **Centralized Data**: Single source of truth (`data.json`)
5. **Component-Based**: Reusable UI components
6. **CSS Layers**: Organized, maintainable stylesheets
7. **Modular Structure**: Easy to extend and maintain

---

## 📝 Notes

- The router uses the History API for client-side routing
- All page content is dynamically generated from `data.json`
- Navigation is automatically updated based on current route
- Components are created and destroyed on each route change (no state persistence)
- Styles are organized by concern using CSS layers
- The app is designed to be easily extensible

---

## 🚀 Future Enhancements

Possible improvements:
- Add loading states for data fetching
- Implement page transitions/animations
- Add error boundaries for failed data loads
- Implement state management if complexity grows
- Add TypeScript for type safety
- Add unit tests for components and services
- Implement lazy loading for images
- Add service worker for offline support

---

**Last Updated**: 2025-11-08
**Project**: Space Tourism Website
**Architecture**: Vanilla JS SPA with Client-Side Routing

