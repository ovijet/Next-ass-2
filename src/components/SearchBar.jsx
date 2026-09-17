import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, isSearching }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="relative group">
        
        {/* Glow effect on focus/hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition duration-500 group-focus-within:opacity-60" />

        {/* Search Bar Input Container */}
        <div className="relative flex items-center bg-[#131926] border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl">
          
          {/* Search Icon */}
          <div className="pl-3 sm:pl-4 pr-2 text-slate-400">
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-xl">🔍</span>
            )}
          </div>

          {/* Search Input Field */}
          <input
            type="text"
            id="search-movie-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie or TV show title (e.g. Girls, Batman, Office)..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2 focus:outline-none font-medium"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              id="search-clear-btn"
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors mr-1"
              title="Clear search"
            >
              <span className="text-sm font-bold">✕</span>
            </button>
          )}

          {/* Action Search Pill */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors shadow-md"
          >
            <span>Search</span>
          </button>
        </div>

      </div>
    </div>
  );
}
