/**
 * TVMaze API Integration Service
 * Base API URL: https://api.tvmaze.com
 */

const BASE_URL = "https://api.tvmaze.com";

// Fallback high quality poster image for shows without an official image
export const PLACEHOLDER_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop";
export const PLACEHOLDER_BACKDROP =
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1200&auto=format&fit=crop";

/**
 * Normalizes raw show data from either GET /shows or GET /search/shows
 */
const normalizeShow = (item) => {
  // If item comes from search API endpoint, the show data is nested inside `item.show`
  const showData = item.show ? item.show : item;

  return {
    id: showData.id,
    name: showData.name || "Untitled Show",
    type: showData.type || "TV Show",
    language: showData.language || "English",
    genres:
      showData.genres && showData.genres.length > 0
        ? showData.genres
        : ["Entertainment"],
    status: showData.status || "Unknown",
    runtime: showData.runtime || showData.averageRuntime || "N/A",
    premiered: showData.premiered || null,
    rating: showData.rating?.average
      ? Number(showData.rating.average).toFixed(1)
      : "N/A",
    image: {
      medium: showData.image?.medium || PLACEHOLDER_POSTER,
      original:
        showData.image?.original ||
        showData.image?.medium ||
        PLACEHOLDER_POSTER,
    },
    summary:
      showData.summary ||
      "<p>No overview summary available for this show at the moment.</p>",
    officialSite: showData.officialSite || null,
    network:
      showData.network?.name ||
      showData.webChannel?.name ||
      "Streaming Platform",
    schedule: showData.schedule
      ? `${showData.schedule.days?.join(", ") || ""} ${showData.schedule.time || ""}`.trim()
      : null,
  };
};

/**
 * Fetch all available TV shows from TVMaze API
 * Endpoint: GET https://api.tvmaze.com/shows
 */
export async function getAllShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(normalizeShow);
  } catch (error) {
    console.error("API Error in getAllShows:", error);
    throw error;
  }
}

/**
 * Search shows by title query from TVMaze API
 * Endpoint: GET https://api.tvmaze.com/search/shows?q=:query
 */
export async function searchShows(query) {
  if (!query || query.trim() === "") {
    return getAllShows();
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to search shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(normalizeShow);
  } catch (error) {
    console.error(`API Error in searchShows for "${query}":`, error);
    throw error;
  }
}
