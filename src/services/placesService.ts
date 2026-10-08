export interface PlaceSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

// Client-side in-memory cache
const CLIENT_PLACES_CACHE = new Map<string, PlaceSuggestion[]>();

/**
 * Fetch autocomplete suggestions with client-side cache
 */
export async function fetchPlaceSuggestions(
  query: string,
  signal?: AbortSignal
): Promise<PlaceSuggestion[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const cacheKey = trimmed.toLowerCase();

  // Return from client cache immediately if exists
  if (CLIENT_PLACES_CACHE.has(cacheKey)) {
    return CLIENT_PLACES_CACHE.get(cacheKey) || [];
  }

  try {
    const res = await fetch("/api/places/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: trimmed }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`Autocomplete error ${res.status}`);
    }

    const data = await res.json();
    const suggestions: PlaceSuggestion[] = data.suggestions || [];

    // Save to client cache
    CLIENT_PLACES_CACHE.set(cacheKey, suggestions);

    return suggestions;
  } catch (err: any) {
    if (err.name === "AbortError") {
      // Fetch aborted due to new keystroke, safely ignore
      return [];
    }
    console.error("Failed to fetch place suggestions:", err);
    return [];
  }
}
