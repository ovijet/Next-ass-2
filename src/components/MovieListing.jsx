import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

export default function MovieListing({
  shows,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  onSeeDetails,
  onRetry
}) {
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Predefined genre list for filtering
  const genres = ['All', 'Drama', 'Action', 'Comedy', 'Science-Fiction', 'Crime', 'Romance', 'Thriller'];

  // Filter shows by selected genre pill if not 'All'
  const filteredShows = selectedGenre === 'All' 
    ? shows 
    : shows.filter(show => show.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Heading */}
      <div className="text-center mb-8">
        <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
          Explore <span className="text-gradient">Movies & TV Shows</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Browse through our extensive catalog or use the search bar to find your favorite titles.
        </p>
      </div>

      {/* Search Bar Component */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={loading && searchQuery.length > 0}
      />

      {/* Genre Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
              selectedGenre === genre
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30 scale-105'
                : 'glass-card text-slate-300 hover:text-white border-white/10 hover:border-purple-500/30'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Error Message Alert */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center max-w-xl mx-auto mb-10">
          <p className="text-red-400 font-semibold mb-3">⚠️ {error}</p>
          <button
            onClick={onRetry}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 animate-pulse space-y-4">
              <div className="aspect-[2/3] bg-slate-800 rounded-xl w-full" />
              <div className="h-5 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800 rounded w-1/2" />
              <div className="h-10 bg-slate-800 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredShows.length > 0 ? (
        /* Movie Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredShows.map((show) => (
            <MovieCard
              key={show.id}
              show={show}
              onSeeDetails={onSeeDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto border border-white/10">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-['Outfit'] font-bold text-xl text-white mb-2">No Movies Found</h3>
          <p className="text-slate-400 text-sm mb-6">
            We couldn't find any shows matching "{searchQuery}" {selectedGenre !== 'All' ? `in genre ${selectedGenre}` : ''}.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('All');
            }}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors"
          >
            Clear Filters & Search
          </button>
        </div>
      )}

    </section>
  );
}
