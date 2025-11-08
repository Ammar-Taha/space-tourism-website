/**
 * Data Service
 * Loads and manages data from data.json
 */
import data from "../data.json";

const assetManifest = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
});

/**
 * Resolve asset URL using Vite's asset manifest
 * @param {string} path - Asset path from data.json
 * @returns {string} - Resolved URL
 */
function resolveAssetUrl(path) {
  const normalized = path
    .replace(/^\/+/, "")
    .replace(/^src\//, "")
    .replace(/^assets\//, "");

  const key = `../assets/${normalized}`;
  const resolved = assetManifest[key];

  if (!resolved) {
    console.warn(`Asset not found for path: ${path}`);
    return path;
  }

  return resolved;
}

/**
 * Process data and resolve all image paths
 * @param {object} data - Raw data from JSON
 * @returns {object} - Data with resolved image paths
 */
function processImagePaths(data) {
  const processed = JSON.parse(JSON.stringify(data)); // Deep clone

  // Process destinations
  if (processed.destinations) {
    processed.destinations = processed.destinations.map((dest) => ({
      ...dest,
      images: {
        png: resolveAssetUrl(dest.images.png),
        webp: resolveAssetUrl(dest.images.webp),
      },
    }));
  }

  // Process crew
  if (processed.crew) {
    processed.crew = processed.crew.map((member) => ({
      ...member,
      images: {
        png: resolveAssetUrl(member.images.png),
        webp: resolveAssetUrl(member.images.webp),
      },
    }));
  }

  // Process technology
  if (processed.technology) {
    processed.technology = processed.technology.map((tech) => ({
      ...tech,
      images: {
        portrait: resolveAssetUrl(tech.images.portrait),
        landscape: resolveAssetUrl(tech.images.landscape),
      },
    }));
  }

  return processed;
}

class DataService {
  constructor() {
    this.data = null;
    this.loaded = false;
  }

  /**
   * Load data from data.json
   */
  async load() {
    if (this.loaded) {
      return this.data;
    }

    try {
      // Import JSON directly (Vite handles this)
      // Process image paths to resolve Vite base URL
      this.data = processImagePaths(data);
      this.loaded = true;
      return this.data;
    } catch (error) {
      console.error("Error loading data:", error);
      throw error;
    }
  }

  /**
   * Get all destinations
   */
  getDestinations() {
    return this.data?.destinations || [];
  }

  /**
   * Get a destination by name
   */
  getDestination(name) {
    return this.getDestinations().find(
      (dest) => dest.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Get all crew members
   */
  getCrew() {
    return this.data?.crew || [];
  }

  /**
   * Get a crew member by role or name
   */
  getCrewMember(identifier) {
    return this.getCrew().find(
      (member) =>
        member.role.toLowerCase() === identifier.toLowerCase() ||
        member.name.toLowerCase() === identifier.toLowerCase()
    );
  }

  /**
   * Get all technology items
   */
  getTechnology() {
    return this.data?.technology || [];
  }

  /**
   * Get a technology item by name
   */
  getTechnologyItem(name) {
    return this.getTechnology().find(
      (tech) => tech.name.toLowerCase() === name.toLowerCase()
    );
  }
}

// Export singleton instance
export const dataService = new DataService();
