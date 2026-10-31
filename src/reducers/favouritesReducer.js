export const FAVOURITES_ACTIONS = {
  ADD_FAVOURITE: 'ADD_FAVOURITE',
  REMOVE_FAVOURITE: 'REMOVE_FAVOURITE',
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photos';

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

export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.ADD_FAVOURITE: {
      const photoId = action.payload;
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
