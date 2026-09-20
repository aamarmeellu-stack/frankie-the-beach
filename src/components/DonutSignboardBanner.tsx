import React from 'react';
import { Sparkles, UtensilsCrossed, Award, Flame } from 'lucide-react';

interface DonutSignboardBannerProps {
  activeSubCategory: string;
  onSelectSubCategory: (subCat: string) => void;
  onFilterSearch?: (query: string) => void;
}

export const DonutSignboardBanner: React.FC<DonutSignboardBannerProps> = ({
  activeSubCategory,
  onSelectSubCategory,
  onFilterSearch,
}) => {
  return (
    <div className="mb-8 relative rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,112,224,0.45)] border-3 border-amber-400 bg-[radial-gradient(ellipse_at_50%_25%,#0086FF_0%,#0070E0_45%,#004CB8_85%,#00368C_100%)] text-white p-5 sm:p-8">
      {/* Decorative Golden Corner Pins */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-amber-200 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-amber-200 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-amber-200 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-amber-200 pointer-events-none" />

      {/* Subtle Inner Pinstripe Frame */}
      <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-amber-300/40 pointer-events-none" />

      {/* Top Brand Seal (Oval Ring matching Frankie's Signboard) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-amber-400/90 bg-black/20 backdrop-blur-xs shadow-md mb-2">
          <span className="font-script text-2xl sm:text-3xl font-bold text-amber-300 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Frankie's
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-200 font-heading">
            @ THE BEACH
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 fill-current animate-pulse" />
        </div>

        {/* 3D Dimensional Title: HOT DONUTS */}
        <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D0] via-[#FFD770] to-[#E5A830] drop-shadow-[0_4px_0_#804500] drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] my-1 select-none">
          HOT DONUTS
        </h2>
        <p className="text-xs sm:text-sm text-sky-100 font-semibold tracking-wide max-w-xl mx-auto drop-shadow-sm mt-1">
          Fried fresh to golden perfection on the promenade at Ramsgate Beach • Tossed hot in sweet sugar!
        </p>
      </div>

      {/* Signboard Menu Tiers Grid (Inspired by the Authentic Signboard) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        
        {/* Tier 1: Plain With Sugar */}
        <div
          onClick={() => onSelectSubCategory('Plain with Sugar')}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 ${
            activeSubCategory === 'Plain with Sugar'
              ? 'bg-white text-black border-amber-400 shadow-xl scale-102'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-amber-300/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-xs font-black uppercase tracking-wider ${activeSubCategory === 'Plain with Sugar' ? 'text-[#0070E0]' : 'text-amber-300'}`}>
              Plain with Sugar
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black">
              Hot &amp; Fresh
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mt-3">
            <div className={`p-2 rounded-xl border ${activeSubCategory === 'Plain with Sugar' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
              <span className="block text-lg sm:text-xl font-black font-heading text-amber-400">2</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${activeSubCategory === 'Plain with Sugar' ? 'text-black' : 'text-white'}`}>Pack</span>
            </div>
            <div className={`p-2 rounded-xl border ${activeSubCategory === 'Plain with Sugar' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
              <span className="block text-lg sm:text-xl font-black font-heading text-amber-400">5</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${activeSubCategory === 'Plain with Sugar' ? 'text-black' : 'text-white'}`}>Bag</span>
            </div>
            <div className={`p-2 rounded-xl border ${activeSubCategory === 'Plain with Sugar' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
              <span className="block text-lg sm:text-xl font-black font-heading text-amber-400">10</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${activeSubCategory === 'Plain with Sugar' ? 'text-black' : 'text-white'}`}>Box</span>
            </div>
          </div>
          <p className={`text-[11px] mt-2.5 text-center ${activeSubCategory === 'Plain with Sugar' ? 'text-gray-600' : 'text-sky-100'}`}>
            Golden sharing box for family &amp; friends
          </p>
        </div>

        {/* Tier 2: Ice Cream Combos */}
        <div
          onClick={() => onSelectSubCategory('Ice Cream Combos')}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 ${
            activeSubCategory === 'Ice Cream Combos'
              ? 'bg-white text-black border-amber-400 shadow-xl scale-102'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-amber-300/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-xs font-black uppercase tracking-wider ${activeSubCategory === 'Ice Cream Combos' ? 'text-[#0070E0]' : 'text-amber-300'}`}>
              2 with Ice Cream
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white">
              🍦 Soft-Serve
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 text-center">
            <div className={`p-2 rounded-xl border ${activeSubCategory === 'Ice Cream Combos' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
              <span className="block text-[10px] uppercase font-black tracking-wide text-rose-500">&amp; Toppings</span>
              <span className="block text-base sm:text-lg font-black font-heading text-amber-400">Loaded</span>
              <span className={`text-[10px] font-medium ${activeSubCategory === 'Ice Cream Combos' ? 'text-gray-600' : 'text-sky-200'}`}>2 Donuts</span>
            </div>
            <div className={`p-2 rounded-xl border ${activeSubCategory === 'Ice Cream Combos' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
              <span className="block text-[10px] uppercase font-black tracking-wide text-amber-500">&amp; Sauce</span>
              <span className="block text-base sm:text-lg font-black font-heading text-amber-400">Drizzled</span>
              <span className={`text-[10px] font-medium ${activeSubCategory === 'Ice Cream Combos' ? 'text-gray-600' : 'text-sky-200'}`}>2 Donuts</span>
            </div>
          </div>
          <p className={`text-[11px] mt-2.5 text-center ${activeSubCategory === 'Ice Cream Combos' ? 'text-gray-600' : 'text-sky-100'}`}>
            Warm donuts paired with chilled dairy soft-serve
          </p>
        </div>

        {/* Tier 3: 20 Topped Flavours */}
        <div
          onClick={() => onSelectSubCategory('Topped Donuts')}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 ${
            activeSubCategory === 'Topped Donuts'
              ? 'bg-white text-black border-amber-400 shadow-xl scale-102'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-amber-300/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-xs font-black uppercase tracking-wider ${activeSubCategory === 'Topped Donuts' ? 'text-[#0070E0]' : 'text-amber-300'}`}>
              2 Topped Donuts
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black">
              20 Flavours!
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border text-center mt-3 ${activeSubCategory === 'Topped Donuts' ? 'bg-sky-50 border-[#0070E0]/30' : 'bg-black/30 border-white/15'}`}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-heading text-amber-400">20 GOURMET</span>
              <span className={`text-xs font-extrabold uppercase ${activeSubCategory === 'Topped Donuts' ? 'text-[#0070E0]' : 'text-white'}`}>Flavours</span>
            </div>
            <p className={`text-[10px] font-medium mt-0.5 ${activeSubCategory === 'Topped Donuts' ? 'text-gray-600' : 'text-sky-200'}`}>
              Biscoff, Oreo, Bueno, Creme Egg, Dr Pepper &amp; more
            </p>
          </div>
          <p className={`text-[11px] mt-2.5 text-center ${activeSubCategory === 'Topped Donuts' ? 'text-gray-600' : 'text-sky-100'}`}>
            Click to view all 20 signature gourmet toppings
          </p>
        </div>

      </div>

      {/* Filter Reset / Show All Button */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 mt-5 pt-4 border-t border-white/20">
        <button
          onClick={() => onSelectSubCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeSubCategory === 'all'
              ? 'bg-amber-400 text-black shadow-md'
              : 'bg-black/30 text-white hover:bg-white/20 border border-white/30'
          }`}
        >
          View All Donut Varieties (25 Items)
        </button>
      </div>
    </div>
  );
};
