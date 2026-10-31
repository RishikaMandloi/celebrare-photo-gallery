# Photo Gallery – Celebrare Frontend React Internship Assignment

A clean, responsive, and performant Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS** for the Celebrare Frontend React Internship Pre-Screening Assignment.

The application fetches 30 curated photographs from the Picsum Photos API, presents them in an elegant responsive grid, enables real-time author search with zero unnecessary API calls, and provides persistent favourites management powered by `useReducer` and `localStorage`.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Information](#api-information)
- [Architecture & React Hooks](#architecture--react-hooks)
- [Project Folder Structure](#project-folder-structure)
- [Installation Instructions](#installation-instructions)
- [Commands to Run the Application](#commands-to-run-the-application)
- [Verification & Testing](#verification--testing)

---

## Features

- **Initial Load & Fetching**: Fetches exactly 30 high-resolution photos on initial application mount using the JavaScript Fetch API.
- **Custom Hook Architecture**: All API fetching, loading, and error states are encapsulated inside a custom `useFetchPhotos` hook returning `{ photos, loading, error }`.
- **Responsive Layout**:
  - **Desktop (1024px+)**: 4 columns (`lg:grid-cols-4`)
  - **Tablet (768px - 1023px)**: 2 columns (`md:grid-cols-2`)
  - **Mobile (< 768px)**: 1 column (`grid-cols-1`)
- **Real-Time Search**: Instant, case-insensitive search by photographer/author name with an intuitive clear button and empty search state.
- **Zero Redundant API Requests**: Searching filters in-memory data without triggering additional network requests.
- **Favourites with `useReducer`**:
  - Favourite state is managed strictly with `useReducer` (no `useState` for favourites).
  - Supports `ADD_FAVOURITE`, `REMOVE_FAVOURITE`, and `TOGGLE_FAVOURITE` action types.
  - Avoids duplicate favourite entries using photo IDs.
  - Active favourites are visually highlighted with animated badges and red-filled heart icons.
- **Persistence Across Refreshes**:
  - Uses browser `localStorage` to persist favourited photo IDs.
  - Initializes state lazily via an initializer function in `useReducer`.
  - Automatically synchronizes updates to `localStorage`.
- **Optimized Rendering**:
  - `useCallback` memoizes the search input handler to avoid function recreation across re-renders.
  - `useMemo` caches the filtered photo list, ensuring expensive array operations run only when photos or query change.
- **Robust Error & Loading States**:
  - Modern animated circular spinner while fetching.
  - Friendly error card with status information and retry option if the request fails.
  - Empty search feedback when no photos match the user's query.

---

## Technologies Used

- **React 19** – Functional components and modern React hooks.
- **Vite** – Fast build tool and local development server.
- **Tailwind CSS** – Utility-first CSS framework for styling and responsive design.
- **JavaScript (ES Modules)** – Pure JavaScript with no TypeScript.
- **Fetch API** – Native browser HTTP requests.
- **localStorage API** – Client-side persistent storage.
- **Picsum Photos API** – Source of high-quality photographs.

*No external UI component libraries (such as MUI, Bootstrap, Chakra, or Shadcn) or external state libraries (such as Redux) are used, adhering strictly to the assignment specifications.*

---

## API Information

- **Endpoint**: `https://picsum.photos/v2/list?limit=30`
- **Method**: `GET`
- **Authentication**: None required.
- **Payload Shape**:
  ```json
  [
    {
      "id": "0",
      "author": "Alejandro Escamilla",
      "width": 5000,
      "height": 3333,
      "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
      "download_url": "https://picsum.photos/id/0/5000/3333"
    }
  ]
  ```

---

## Architecture & React Hooks

| Hook | File | Implementation Purpose |
| :--- | :--- | :--- |
| `useFetchPhotos` | `src/hooks/useFetchPhotos.js` | Dedicated custom hook fetching photos from Picsum API, returning `{ photos, loading, error }`. |
| `useReducer` | `src/components/Gallery.jsx` | Manages favourites state with `favouritesReducer`, `initFavourites` lazy initializer, and action types (`ADD_FAVOURITE`, `REMOVE_FAVOURITE`, `TOGGLE_FAVOURITE`). |
| `useCallback` | `src/components/Gallery.jsx` | Memoizes the search input change handler (`handleSearchChange`) to preserve its reference across re-renders. |
| `useMemo` | `src/components/Gallery.jsx` | Computes the `filteredPhotos` array only when `photos` or `searchQuery` changes, skipping recalculation when favourites toggle. |
| `useEffect` | `src/components/Gallery.jsx` | Synchronizes the updated favourites array to `localStorage` whenever favourites state changes. |

---

## Project Folder Structure

```
photo-gallery/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Gallery.jsx          # Core container with search, grid, state & hook usage
│   │   ├── LoadingSpinner.jsx   # Animated loading spinner for fetch state
│   │   ├── PhotoCard.jsx        # Individual card with image, author & favourite heart
│   │   └── SearchBar.jsx        # Real-time search bar with clear button
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook fetching 30 photos with loading & error states
│   ├── reducers/
│   │   └── favouritesReducer.js # Reducer handling ADD, REMOVE, TOGGLE & lazy localStorage init
│   ├── App.jsx                  # Main application wrapper with minimal layout & footer
│   ├── index.css                # Global CSS with Tailwind CSS v4 setup
│   └── main.jsx                 # React root mount entrypoint
├── index.html                   # HTML template with application title and viewport meta
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
└── README.md                    # Project documentation
```

---

## Installation Instructions

1. **Clone or navigate to the repository directory**:
   ```bash
   cd photo-gallery
   ```

2. **Verify Node.js is installed**:
   Ensure you have Node.js (v18 or higher recommended):
   ```bash
   node -v
   npm -v
   ```

3. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## Commands to Run the Application

### Development Server
Starts the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
Builds the production-ready assets in the `dist` directory:
```bash
npm run build
```

### Preview Production Build
Locally previews the production build output:
```bash
npm run preview
```

### Code Quality / Lint
Runs the project linter:
```bash
npm run lint
```

---

## Verification & Testing

Every requirement of the Celebrare assignment has been implemented and tested:

1. **Application Load**: Starts reliably on `http://localhost:5173`.
2. **30 Photos Fetched**: Fetches exactly 30 photos from `https://picsum.photos/v2/list?limit=30`.
3. **Loading Spinner**: Displayed while data is being fetched.
4. **Error Handling**: Non-200 HTTP responses and network errors display a friendly error message and retry button.
5. **Responsive Grid**: 4 columns on desktop (`lg`), 2 columns on tablet (`md`), 1 column on mobile (`grid-cols-1`).
6. **Author Names**: Displayed clearly with styling and truncation for long names.
7. **Real-Time Search**: Instant case-insensitive filtering by photographer name.
8. **No Additional API Calls on Search**: Filtering operates purely in memory on cached photos.
9. **Favourites Management**: Managed with `useReducer` supporting `ADD_FAVOURITE`, `REMOVE_FAVOURITE`, and `TOGGLE_FAVOURITE`.
10. **Visual Highlighting**: Favourited cards show a red-filled heart and "Favorited" pill badge.
11. **Persistence Across Refresh**: Favourites persist in browser `localStorage` and initialize cleanly upon reload.
12. **Hook Optimization**: `useCallback` memoizes search handlers; `useMemo` caches filtered photo calculations.
