/**
 * Utility functions for MovieExplorer
 */

/**
 * Strips HTML tags safely from string or formats HTML safely
 */
export function cleanSummary(htmlString) {
  if (!htmlString) return 'No description available.';
  // Strip HTML tags for clean text rendering
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
}

/**
 * Format date string (e.g. 2024-03-15 -> 2024 or Mar 2024)
 */
export function formatReleaseYear(dateString) {
  if (!dateString) return 'N/A';
  const year = new Date(dateString).getFullYear();
  return isNaN(year) ? 'N/A' : year;
}

/**
 * Format full date string (e.g. 2024-03-15 -> March 15, 2024)
 */
export function formatFullDate(dateString) {
  if (!dateString) return 'Unknown Date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
