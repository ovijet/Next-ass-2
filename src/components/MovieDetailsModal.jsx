import React, { useEffect } from 'react';
import { cleanSummary, formatFullDate } from '../lib/utils';

export default function MovieDetailsModal({ show, onClose }) {
  if (!show) return null;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formattedDate = formatFullDate(show.premiered);
  const plainSummaryText = cleanSummary(show.summary);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      id="movie-modal-backdrop"
    >
      {/* Modal Dialog Content Box */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#121826] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click inside content box
        id="movie-modal-container"
      >

        {/* Top Header Controls / Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 flex-shrink-0">
          {/* Backdrop Image */}
          <img
            src={show.image.original || show.image.medium}
            alt={show.name}
            className="w-full h-full object-cover object-center filter brightness-90"
          />

          {/* Gradient Overlay for Readable Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-[#121826]/40 to-transparent" />

          {/* Close Top-Right Button (✕) */}
          <button
            onClick={onClose}
            id="modal-btn-close-icon"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center text-lg font-bold transition-transform hover:scale-110 active:scale-95 shadow-lg backdrop-blur-md"
            title="Close modal"
          >
            ✕
          </button>

          {/* Poster Overlay on Backdrop */}
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <img 
              src={show.image.medium} 
              alt={show.name}
              className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-2xl border-2 border-white/20 shadow-2xl hidden sm:block"
            />
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {show.genres.map((genre, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold backdrop-blur-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-4xl text-white tracking-tight drop-shadow-md">
                {show.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Body Details Section */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Key Stats Bar: Rating & Release Date */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Rating</span>
              <span className="font-bold text-amber-400 text-base flex items-center gap-1 mt-0.5">
                ⭐ {show.rating}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Release Date</span>
              <span className="font-semibold text-white mt-0.5 block truncate">
                📅 {formattedDate}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Status</span>
              <span className="font-semibold text-cyan-300 mt-0.5 block">
                {show.status}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Network</span>
              <span className="font-semibold text-purple-300 mt-0.5 block truncate">
                📺 {show.network}
              </span>
            </div>
          </div>

          {/* Overview / Summary */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span>📖</span>
              <span>Overview</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal bg-slate-900/50 p-4 rounded-2xl border border-white/5">
              {plainSummaryText}
            </p>
          </div>

          {/* Additional Relevant Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-lg">🌐</span>
              <div>
                <span className="text-slate-400 block text-xs">Language</span>
                <span className="font-semibold text-white">{show.language}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-lg">⏱️</span>
              <div>
                <span className="text-slate-400 block text-xs">Runtime</span>
                <span className="font-semibold text-white">{show.runtime} minutes</span>
              </div>
            </div>
          </div>

          {/* External Link */}
          {show.officialSite && (
            <div className="pt-2">
              <a
                href={show.officialSite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4"
              >
                <span>Visit Official Website</span>
                <span>↗</span>
              </a>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              id="modal-btn-close-bottom"
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-white/10 transition-colors flex items-center gap-2"
            >
              <span>❌ Close</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
