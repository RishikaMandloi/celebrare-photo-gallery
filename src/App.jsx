import Gallery from './components/Gallery';

/**
 * App Component
 *
 * Root component of the Celebrare Photo Gallery application.
 * Provides the overall page layout and light neutral background styling.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-800">
      {/* Gallery Main Container */}
      <div className="flex-1">
        <Gallery />
      </div>

      {/* Clean Minimalist Footer */}
      <footer className="py-6 border-t border-gray-200 text-center text-xs text-gray-400 bg-white">
        <p>Celebrare Frontend React Internship Assignment &bull; Built with React, Vite &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}
