import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  FAVOURITES_ACTIONS,
  FAVOURITES_STORAGE_KEY,
} from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to sync favourites to localStorage:', err);
    }
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const filteredPhotos = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmedQuery)
    );
  }, [photos, searchQuery]);

  const handleToggleFavourite = (photoId) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  };

  return (
    <div className="w-full">
      <header className="text-center pt-10 pb-6 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Photo Gallery
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover beautiful moments from around the world.
        </p>

        {!loading && !error && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>
              Total Photos: <strong className="text-gray-800">{photos.length}</strong>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-4 h-4 text-red-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Favorites: <strong className="text-gray-800">{favourites.length}</strong>
            </span>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {!loading && !error && (
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          />
        )}

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <div
            role="alert"
            className="max-w-xl mx-auto my-12 p-8 bg-red-50 border border-red-200 rounded-2xl text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-900 mb-2">
              Failed to Load Photos
            </h2>
            <p className="text-red-700 text-sm leading-relaxed mb-6">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-full shadow-sm hover:shadow transition duration-200 cursor-pointer"
            >
              Retry Loading Gallery
            </button>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No matching photos found
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              No photos found matching &ldquo;{searchQuery}&rdquo;. Try another author name.
            </p>
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-sm transition duration-200 cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mb-4 font-medium">
                Showing {filteredPhotos.length} of {photos.length} photos for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
