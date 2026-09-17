import React from 'react';

export default function Navbar({ activeView, setActiveView }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveView('home')} 
          className="flex items-center gap-3 group text-left focus:outline-none"
          id="nav-brand-logo"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center">
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🎬</span>
            </div>
          </div>
          <div>
            <span className="font-['Outfit'] font-extrabold text-2xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Movie<span className="text-gradient">Explorer</span>
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Cinema Database
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveView('home')}
            id="nav-link-home"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeView === 'home'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveView('movies')}
            id="nav-link-movies"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeView === 'movies'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Movies & Shows
          </button>

          {/* Prominent CTA Button */}
          <button
            onClick={() => setActiveView('movies')}
            id="nav-cta-explore"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Explore Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </nav>

      </div>
    </header>
  );
}
