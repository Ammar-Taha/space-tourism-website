/**
 * 404 Not Found Page
 */
export async function renderNotFound() {
  const container = document.getElementById("main-content");
  container.className = "flow";
  container.innerHTML = `
    <h1 class="fs-700 ff-serif">404</h1>
    <p class="fs-500">Page not found</p>
    <a href="/" class="large-button uppercase ff-serif text-dark bg-white">
      Go Home
    </a>
  `;

  document.title = "Space Tourism | Page Not Found";
}
