/**
 * Favourites Reducer and Action Types
 *
 * Implements state management for favourite photos using useReducer:
 * - ADD_FAVOURITE: Adds a photo ID to the favourites list if not already present.
 * - REMOVE_FAVOURITE: Removes a photo ID from the favourites list.
 * - TOGGLE_FAVOURITE: Toggles a photo ID between favourited and non-favourited.
 * - initFavourites: Lazy initializer that reads saved favourites from localStorage.
 */

export const FAVOURITES_ACTIONS = {
  ADD_FAVOURITE: 'ADD_FAVOURITE',
  REMOVE_FAVOURITE: 'REMOVE_FAVOURITE',
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photos';

/**
 * Lazy initializer function for useReducer.
 * Retrieves and parses saved favourites from browser localStorage on initial render.
 *
 * @param {Array} defaultState - Fallback empty array if nothing is stored
 * @returns {Array<string|number>} Initial list of favourite photo IDs
 */
export function initFavourites(defaultState = []) {
  try {
    const storedData = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
  } catch (err) {
    console.error('Failed to load favourites from localStorage:', err);
  }
  return defaultState;
}

/**
 * Reducer function for favourite photos state.
 *
 * @param {Array<string|number>} state - Current array of favourite photo IDs
 * @param {{ type: string, payload: string|number }} action - Action dispatched
 * @returns {Array<string|number>} Updated array of favourite photo IDs
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.ADD_FAVOURITE: {
      const photoId = action.payload;
      // Avoid duplicate entries
      if (state.includes(photoId)) {
        return state;
      }
      return [...state, photoId];
    }

    case FAVOURITES_ACTIONS.REMOVE_FAVOURITE: {
      const photoId = action.payload;
      return state.filter((id) => id !== photoId);
    }

    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      // If photo is already in favourites, remove it; otherwise, add it
      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }
      return [...state, photoId];
    }

    default:
      return state;
  }
}

export default favouritesReducer;

