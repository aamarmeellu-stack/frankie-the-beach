import React, { useState } from 'react';
import { Trophy, Award, Sparkles, Star, Maximize2, X, CheckCircle2 } from 'lucide-react';
import { EXTRA_MILE_AWARD_DATA } from '../data/restaurantData';

export const NationalAwardBanner: React.FC = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const awardPhotoSrc = '/2024 Award.jpeg';
  const fallbackPhotoSrc = '/2024-award.jpeg';

  return (
    <>
      <section
        id="award-winner-section"
        aria-label="2024 Extra Mile Award Winner"
        className="relative bg-gradient-to-b from-[#0B2341] via-[#0E355E] to-[#0A1E35] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-y-2 border-[#D1A03F]/40 shadow-xl"
      >
        {/* Soft, warm background light accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D1A03F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0580FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Main 2-Column Spacious Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Ceremony Photo */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="group relative cursor-pointer w-full max-w-lg bg-white p-3 sm:p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(209,160,63,0.3)] border border-[#ECD87A]/30"
                onClick={() => setIsPhotoModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPhotoModalOpen(true); }}
                aria-label="Click to enlarge 2024 Extra Mile Award photo"
              >
                {/* Photo container */}
                <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-[4/3] flex items-center justify-center">
                  <img
                    src={awardPhotoSrc}
                    alt="Frankie's @ The Beach team winning the 2024 Extra Mile Award on stage at 1066 Business Awards"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if URL encoded name preferred by browser
                      const target = e.currentTarget;
                      if (target.src !== fallbackPhotoSrc) {
                        target.src = fallbackPhotoSrc;
                      }
                    }}
                    loading="eager"
                  />
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                    <div className="bg-black/70 px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                      <Maximize2 className="w-4 h-4 text-[#ECD87A]" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>

                  {/* Corner Trophy Badge */}
                  <div className="absolute top-3 left-3 bg-[#0E355E]/90 backdrop-blur-md text-[#ECD87A] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md border border-[#ECD87A]/30">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>2024 Winner</span>
                  </div>
                </div>

                {/* Caption below photo */}
                <div className="pt-3.5 pb-1 px-1 flex items-center justify-between text-gray-800">
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      Frankie &amp; Team Receiving The Trophy
                    </p>
                    <p className="text-xs text-gray-500">
                      1066 Business Awards Ceremony Stage
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#0580FF] flex items-center gap-1 hover:underline">
                    <span>Enlarge</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Spacious Story & Award Details */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D1A03F]/20 border border-[#ECD87A]/50 text-[#ECD87A] text-xs sm:text-sm font-semibold tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-[#ECD87A]" />
                <span>1066 Business Awards 2024</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight">
                  2024 Extra Mile <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ECD87A] via-[#F5E8AB] to-[#D1A03F]">
                    Award Winner
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-[#D0DDF0] font-medium">
                  Extra Mile for Customer Service &amp; Hospitality Excellence
                </p>
              </div>

              {/* Judge's Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border-l-4 border-[#ECD87A] text-left backdrop-blur-xs">
                <p className="text-sm sm:text-base italic text-gray-100 leading-relaxed">
                  "{EXTRA_MILE_AWARD_DATA.quote}"
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#ECD87A] mt-2">
                  — {EXTRA_MILE_AWARD_DATA.quoteAuthor}
                </p>
              </div>

              {/* Simple description */}
              <p className="text-sm sm:text-base text-[#B0C8E8] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Recognised across the coast for hospitality that goes above and beyond — from handcrafted smash burgers and fresh loaded chips to friendly smiles for every beachgoer, family, and dog walker right on Ramsgate Sands.
              </p>

              {/* 3 Spacious Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Award className="w-5 h-5 text-[#ECD87A] mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white">Gold Standard</span>
                  <span className="text-[11px] text-[#A0B8D8]">Customer Care</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Star className="w-5 h-5 text-[#ECD87A] fill-[#ECD87A] mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white">5.0 Star Rated</span>
                  <span className="text-[11px] text-[#A0B8D8]">TripAdvisor</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white">Ramsgate Sands</span>
                  <span className="text-[11px] text-[#A0B8D8]">Beachfront Kiosk</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal for the Award Photo */}
      {isPhotoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#0A1E35] rounded-2xl overflow-hidden border border-[#D1A03F]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#0E355E] text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#ECD87A]" />
                <div>
                  <h3 className="font-bold text-base text-white">
                    2024 Extra Mile Award Presentation
                  </h3>
                  <p className="text-xs text-[#ECD87A]">
                    1066 Business Awards — Frankie's @ The Beach
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image */}
            <div className="p-3 sm:p-4 bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={awardPhotoSrc}
                alt="Frankie's @ The Beach 2024 Extra Mile Award Winner"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== fallbackPhotoSrc) {
                    target.src = fallbackPhotoSrc;
                  }
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0E355E] text-center text-xs sm:text-sm text-[#D0DDF0] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="italic">
                "For a small business like Frankie's, the commitment to achieving the extra mile in customer service was engrained in their culture."
              </p>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#ECD87A] text-black font-bold text-xs hover:bg-[#ffe680] transition-colors cursor-pointer shrink-0"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
