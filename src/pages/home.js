/**
 * Home Page
 */
import { router } from "../router/router.js";
import { dataService } from "../services/data-service.js";

export async function renderHome() {
  const container = document.getElementById("main-content");
  container.className = "grid-container grid-container--home";
  container.innerHTML = `
        <div>
          <h1 class="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1">
            So, you want to travel to
            <span class="display-block fs-900 ff-serif text-white">Space</span>
          </h1>
          <p class="text-accent">
            Let's face it; if you want to go to space, you might as well genuinely go to 
            outer space and not hover kind of on the edge of it. Well sit back, and relax 
            because we'll give you a truly out of this world experience!
          </p>
        </div>
        <div>
          <a href="/destination/moon" class="large-button uppercase ff-serif text-dark bg-white">
            Explore
          </a>
        </div>
  `;

  // Update page title
  document.title = "Space Tourism | Home";
}
