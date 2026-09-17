import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieListing from './components/MovieListing';
import MovieDetailsModal from './components/MovieDetailsModal';
import Footer from './components/Footer';
import { getAllShows, searchShows } from './lib/api';

export default function App() {
  // Navigation View State: 'home' | 'movies'
  const [activeView, setActiveView] = useState('home');

  // Movie Data States
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search Query State
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Show for Modal Overlay
  const [selectedShow, setSelectedShow] = useState(null);

  // Fetch initial shows on load
  const fetchDefaultShows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllShows();
      setShows(data);
    } catch (err) {
      setError('Failed to fetch movie data from TVMaze API. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultShows();
  }, [fetchDefaultShows]);

  // Debounced Search Handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchDefaultShows();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchShows(searchQuery);
        setShows(results);
      } catch (err) {
        setError(`Search failed for "${searchQuery}". Please try again.`);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, fetchDefaultShows]);

  // Handle clicking "Explore Now" from Hero or Navbar
  const handleExploreClick = () => {
    setActiveView('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F17] text-slate-100 selection:bg-purple-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeView === 'home' ? (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={handleExploreClick}
              featuredShows={shows}
              onSelectShow={(show) => setSelectedShow(show)}
            />

            {/* Quick Preview of Movie Listing Section below Hero */}
            <div className="pt-4 pb-12">
              <MovieListing
                shows={shows.slice(0, 12)}
                loading={loading}
                error={error}
                searchQuery={searchQuery}
                setSearchQuery={(q) => {
                  setSearchQuery(q);
                  setActiveView('movies');
                }}
                onSeeDetails={(show) => setSelectedShow(show)}
                onRetry={fetchDefaultShows}
              />
            </div>
          </>
        ) : (
          /* Dedicated Movie Listing Page */
          <div className="pt-6 pb-12">
            <MovieListing
              shows={shows}
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSeeDetails={(show) => setSelectedShow(show)}
              onRetry={fetchDefaultShows}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveView} />

      {/* Movie Details Modal */}
      {selectedShow && (
        <MovieDetailsModal
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
        />
      )}

    </div>
  );
}
