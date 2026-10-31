/**
 * LoadingSpinner Component
 *
 * Displays a clean, modern animated spinner and friendly message
 * while the gallery photos are being fetched from the Picsum API.
 */
export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      {/* Animated Circular Spinner */}
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="w-14 h-14 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>

      <h3 className="text-lg font-medium text-gray-800">
        Loading photos...
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Fetching 30 curated moments from Picsum Photos
      </p>
    </div>
  );
}

