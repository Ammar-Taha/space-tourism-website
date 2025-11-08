/**
 * Technology Page
 */
import { router } from "../router/router.js";
import { dataService } from "../services/data-service.js";
import { createNumberedIndicators } from "../components/numbered-indicators.js";

export async function renderTechnology(params) {
  const container = document.getElementById("main-content");
  container.className = "grid-container grid-container--technology flow";

  const technology = dataService.getTechnology();
  if (!technology || technology.length === 0) {
    container.innerHTML = "<p>Loading technology...</p>";
    return;
  }

  // Find initial technology from params or default to first
  let selectedIndex = 0;
  if (params && params.name) {
    // Normalize technology names: launch-vehicle, spaceport, space-capsule
    const nameMap = {
      "launch-vehicle": "Launch vehicle",
      spaceport: "Spaceport",
      "space-capsule": "Space capsule",
    };

    const techName = nameMap[params.name.toLowerCase()] || params.name;
    const foundIndex = technology.findIndex(
      (tech) => tech.name.toLowerCase() === techName.toLowerCase()
    );
    if (foundIndex !== -1) {
      selectedIndex = foundIndex;
    }
  }

  const selectedTech = technology[selectedIndex];

  // Create numbered indicators
  const numberedIndicators = createNumberedIndicators(
    technology.length,
    (index) => {
      const tech = technology[index];
      // Normalize name for URL
      const nameMap = {
        "Launch vehicle": "launch-vehicle",
        Spaceport: "spaceport",
        "Space capsule": "space-capsule",
      };
      const nameSlug =
        nameMap[tech.name] || tech.name.toLowerCase().replace(/\s+/g, "-");
      router.navigate(`/technology/${nameSlug}`);
    },
    selectedIndex
  );

  // Render page
  container.innerHTML = `
    <h1 class="numbered-title">
      <span aria-hidden="true">03</span>Space launch 101
    </h1>

    <article class="technology-details flow">
      <header>
        <h2 class="fs-600 ff-sans-cond text-accent uppercase letter-spacing-3">
          The terminology...
        </h2>
        <p class="fs-700 uppercase ff-serif">${selectedTech.name}</p>
      </header>
      <p class="text-accent">${selectedTech.description}</p>
    </article>

    <div class="technology-image flex">
      <picture>
        <source srcset="${selectedTech.images.landscape}" media="(max-width: 768px)">
        <img src="${selectedTech.images.portrait}" alt="${selectedTech.name}">
      </picture>
    </div>
  `;

  // Insert numbered indicators before the details section
  const technologyDetails = container.querySelector(".technology-details");
  container.insertBefore(numberedIndicators, technologyDetails);

  // Update page title
  document.title = `Space Tourism | Technology - ${selectedTech.name}`;
}
