import React from 'react';

export default function Hero({ onExploreClick, featuredShows = [], onSelectShow }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      
      {/* Background Cinematic Gradients & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-cyan-500/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-900/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-900/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Card Container */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle Banner Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop')` 
            }}
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Unlimited Movies & TV Shows
          </div>

          {/* Main Title Heading */}
          <h1 className="font-['Outfit'] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            DISCOVER <span className="text-gradient">MOVIES</span>
          </h1>

          {/* Short Engaging Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
            Explore and discover your favorite movies and TV series from around the world. Live ratings, complete summaries, cast info, and real-time updates.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              id="hero-cta-explore-now"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Explore Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Wireframe Style Preview Card Box */}
          <div className="mt-12 pt-8 border-t border-white/10 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">⚡ TVMaze API</span>
                <span>• Live Data</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span>⭐ Top Rated Shows</span>
              </span>
            </div>
          </div>

        </div>

        {/* Featured Showcase Grid (If data loaded) */}
        {featuredShows.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Trending Showcase 🍿
                </h2>
                <p className="text-slate-400 text-sm mt-1">Handpicked popular shows trending right now</p>
              </div>
              <button 
                onClick={onExploreClick}
                className="text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center gap-1 group"
              >
                <span>View All Shows</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {featuredShows.slice(0, 6).map((show) => (
                <div 
                  key={show.id}
                  onClick={() => onSelectShow(show)}
                  className="glass-card rounded-2xl p-2.5 cursor-pointer group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 relative bg-slate-800">
                    <img 
                      src={show.image.medium} 
                      alt={show.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      ⭐ {show.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white truncate group-hover:text-purple-300 transition-colors">
                    {show.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {show.genres[0] || 'Drama'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
