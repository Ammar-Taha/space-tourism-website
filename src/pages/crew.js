/**
 * Crew Page
 */
import { router } from "../router/router.js";
import { dataService } from "../services/data-service.js";
import { createDotIndicators } from "../components/dot-indicators.js";

export async function renderCrew(params) {
  const container = document.getElementById("main-content");
  container.className = "grid-container grid-container--crew flow";

  const crew = dataService.getCrew();
  if (!crew || crew.length === 0) {
    container.innerHTML = "<p>Loading crew...</p>";
    return;
  }

  // Find initial crew member from params or default to first
  let selectedIndex = 0;
  if (params && params.role) {
    // Normalize role names: commander, pilot, specialist, engineer
    const roleMap = {
      commander: "Commander",
      pilot: "Pilot",
      specialist: "Mission Specialist",
      engineer: "Flight Engineer",
    };

    const roleName = roleMap[params.role.toLowerCase()] || params.role;
    const foundIndex = crew.findIndex(
      (member) => member.role.toLowerCase() === roleName.toLowerCase()
    );
    if (foundIndex !== -1) {
      selectedIndex = foundIndex;
    }
  }

  const selectedCrew = crew[selectedIndex];

  // Create dot indicators
  const dotIndicators = createDotIndicators(
    crew.length,
    (index) => {
      const member = crew[index];
      // Normalize role for URL
      const roleMap = {
        Commander: "commander",
        Pilot: "pilot",
        "Mission Specialist": "specialist",
        "Flight Engineer": "engineer",
      };
      const roleSlug =
        roleMap[member.role] || member.role.toLowerCase().replace(/\s+/g, "-");
      router.navigate(`/crew/${roleSlug}`);
    },
    selectedIndex
  );

  // Render page
  container.innerHTML = `
    <h1 class="numbered-title">
      <span aria-hidden="true">02</span>Meet your crew
    </h1>

    <picture class="crew-image">
      <source srcset="${selectedCrew.images.webp}" type="image/webp">
      <img src="${selectedCrew.images.png}" alt="${selectedCrew.name}">
    </picture>

    <article class="crew-details flow">
      <header>
        <h2 class="fs-600 ff-serif uppercase">
          ${selectedCrew.role}
        </h2>
        <p class="fs-700 ff-serif uppercase">
          ${selectedCrew.name}
        </p>
      </head>
      <p>${selectedCrew.bio}</p>
    </article> 
  `;

  // Insert dot indicators after the picture element
  // The dot indicators, like the destination tab list, are created dynamically with listeners
  // so we insert them programmatically to keep markup and listeners intact
  const picture = container.querySelector(".crew-image");
  const comment = document.createComment(
    " crew dot indicator navigation - dynamically inserted with event listeners "
  );
  picture.after(comment);
  comment.after(dotIndicators);

  // Update page title
  document.title = `Space Tourism | Crew - ${selectedCrew.name}`;
}
