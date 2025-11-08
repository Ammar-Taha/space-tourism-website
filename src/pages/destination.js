/**
 * Destination Page
 */
import { router } from "../router/router.js";
import { dataService } from "../services/data-service.js";
import { createTabList } from "../components/tab-list.js";

export async function renderDestination(params) {
  const container = document.getElementById("main-content");
  container.className = "grid-container grid-container--destination";

  const destinations = dataService.getDestinations();
  if (!destinations || destinations.length === 0) {
    container.innerHTML = "<p>Loading destinations...</p>";
    return;
  }

  // Find initial destination from params or default to first
  let selectedIndex = 0;
  if (params && params.name) {
    const foundIndex = destinations.findIndex(
      (dest) => dest.name.toLowerCase() === params.name.toLowerCase()
    );
    if (foundIndex !== -1) {
      selectedIndex = foundIndex;
    }
  }

  const selectedDestination = destinations[selectedIndex];

  // Create tab list
  const tabList = createTabList(
    destinations,
    (index) => {
      const dest = destinations[index];
      const name = dest.name.toLowerCase();
      router.navigate(`/destination/${name}`);
    },
    selectedIndex
  );

  // Render page
  container.innerHTML = `
    <h1 class="numbered-title">
      <span aria-hidden="true">01</span>Pick your destination
    </h1>

    <picture class="destination-image">
      <source srcset="${selectedDestination.images.webp}" type="image/webp">
      <img src="${selectedDestination.images.png}" alt="Image of ${selectedDestination.name} destination">
    </picture>

    <article class="destination-info flow">
      <h2 class="fs-800 uppercase ff-serif">${selectedDestination.name}</h2>
      <p>${selectedDestination.description}</p>
      <hr class="destination-divider">
      <div class="destination-meta flex">
        <div>
          <h3 class="text-accent fs-200 uppercase">Avg. distance</h3>
          <p class="ff-serif uppercase">${selectedDestination.distance}</p>
        </div>
        <div>
          <h3 class="text-accent fs-200 uppercase">Est. travel time</h3>
          <p class="ff-serif uppercase">${selectedDestination.travel}</p>
        </div>
      </div>
    </article>
  `;

  // Insert tab list after the picture element
  // The tab list is created as a DOM element (with event listeners) and cannot be included
  // in the innerHTML string, so we insert it programmatically after the picture element
  const picture = container.querySelector(".destination-image");
  const comment = document.createComment(
    " destination tab list navigation - dynamically inserted with event listeners "
  );
  picture.after(comment);
  comment.after(tabList);

  // Update page title
  document.title = `Space Tourism | Destination - ${selectedDestination.name}`;
}
