/**
 * SearchBar Component
 *
 * Provides a clean, modern input field for real-time filtering of photos
 * by author name. Features a search icon and a quick-clear button.
 *
 * @param {{ value: string, onChange: Function, onClear: Function }} props
 */
export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative flex items-center shadow-sm rounded-full">
        {/* Search Lens Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Real-time Search Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search photos by author name..."
          aria-label="Search photos by author name"
          className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
        />

        {/* Clear Button (only shown when user has typed something) */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search input"
            title="Clear search"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

