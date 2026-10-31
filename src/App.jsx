import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-800">
      <div className="flex-1">
        <Gallery />
      </div>

      <footer className="py-6 border-t border-gray-200 text-center text-xs text-gray-400 bg-white">
        <p>Celebrare Frontend React Internship Assignment &bull; Built with React, Vite &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}
