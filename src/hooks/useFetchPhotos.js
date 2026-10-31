import { useState, useEffect } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

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

        if (!response.ok) {
          throw new Error(
            `Failed to load photos: HTTP status ${response.status} (${response.statusText})`
          );
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
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
