import React from 'react';
import { formatReleaseYear } from '../lib/utils';

export default function MovieCard({ show, onSeeDetails }) {
  const releaseYear = formatReleaseYear(show.premiered);

  return (
    <div 
      className="glass-card rounded-2xl p-4 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 relative border border-white/10 shadow-lg hover:shadow-purple-500/10"
      id={`movie-card-${show.id}`}
    >
      {/* Poster Image Area */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-800/80 mb-4 group">
        <img
          src={show.image.medium}
          alt={show.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Rating Badge */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md text-amber-400 font-extrabold text-xs border border-amber-500/30 shadow-lg flex items-center gap-1">
          <span>⭐</span>
          <span>{show.rating}</span>
        </div>

        {/* Primary Genre Tag */}
        {show.genres && show.genres[0] && (
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-purple-900/80 backdrop-blur-md text-purple-200 text-[11px] font-semibold border border-purple-400/30">
            {show.genres[0]}
          </div>
        )}
      </div>

      {/* Show Details Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            className="font-['Outfit'] font-bold text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2"
            title={show.name}
          >
            {show.name}
          </h3>

          {/* Sub-info: Rating & Release Year */}
          <div className="flex items-center gap-3 text-xs text-slate-300 mb-4">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <span>⭐</span>
              <span>{show.rating}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <span>📅</span>
              <span>{releaseYear}</span>
            </span>
          </div>
        </div>

        {/* See Details CTA Button */}
        <button
          onClick={() => onSeeDetails(show)}
          id={`btn-see-details-${show.id}`}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>See Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
}
