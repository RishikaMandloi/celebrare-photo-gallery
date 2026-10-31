import { useState, useEffect } from 'react';

// Exact API endpoint specified by the assignment requirements
const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom Hook: useFetchPhotos
 *
 * Responsibilities:
 * 1. Fetches exactly 30 photos from the Picsum API on mount.
 * 2. Manages 'photos', 'loading', and 'error' states.
 * 3. Handles unsuccessful HTTP responses and network exceptions gracefully.
 * 4. Utilizes AbortController for clean cancellation on unmount.
 * 5. Returns exactly { photos, loading, error }.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(PICSUM_API_URL, {
          signal: abortController.signal,
        });

        // Explicitly handle unsuccessful HTTP status codes (e.g., 404, 500)
        if (!response.ok) {
          throw new Error(
            `Failed to load photos: HTTP status ${response.status} (${response.statusText})`
          );
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Ignore aborted fetches when component unmounts
        if (err.name === 'AbortError') {
          return;
        }

        setError(
          err.message ||
            'Unable to fetch photos at this time. Please verify your internet connection and try again.'
        );
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      abortController.abort();
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;
