import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sandwich,
  Utensils,
  Phone,
  Umbrella,
  X,
  MapPin,
  Compass,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Waves,
} from 'lucide-react';

export const QuickInfoBar: React.FC = () => {
  const navigate = useNavigate();
  const [isBeachModalOpen, setIsBeachModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBeachModalOpen(false);
      }
    };
    if (isBeachModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isBeachModalOpen]);

  // 1. Ramsgate Main Sands action -> Open Modal with Sandy Beach image & text
  const handleRamsgateSandsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBeachModalOpen(true);
  };

  // 2. Promenade Seating action -> Takes to Gallery page
  const handlePromenadeSeatingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Beach Hire action -> Scrolls to Beach Hire section
  const handleBeachHireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('beach-hire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#beach-hire');
    }
  };

  return (
    <>
      <section className="bg-[#EEEFE9] py-6 sm:py-8 border-b border-[#e1e4d8]" id="info-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#dde0d5]">
            
            {/* 1. RAMSGATE MAIN SANDS - Click shows text & sandy beach image */}
            <div
              onClick={handleRamsgateSandsClick}
              className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-2 sm:pt-0 group cursor-pointer hover:bg-white/40 rounded-xl p-2 transition-all"
              title="Click Here to learn more about Ramsgate Main Sands and see the sandy beach"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleRamsgateSandsClick(e as unknown as React.MouseEvent)}
              id="quick-info-ramsgate-sands"
            >
              <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0070E0] group-hover:scale-110 transition-transform">
                <Sandwich className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0070E0] transition-colors">
                    RAMSGATE MAIN SANDS
                  </p>
                  <button
                    type="button"
                    onClick={handleRamsgateSandsClick}
                    className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-black text-[10px] sm:text-[11px] font-heading font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm border border-amber-500/50 tracking-wide inline-flex items-center gap-1 shrink-0 transition-transform group-hover:scale-105 cursor-pointer"
                    title="Click Here to see Ramsgate Main Sands photos & details"
                  >
                    <span>CLICK HERE</span>
                    <span className="text-[11px]">➔</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                  Kiosk 1, Marina Esplanade, CT11 8LS
                </p>
              </div>
            </div>

            {/* 2. PROMENADE SEATING - Click takes to Gallery */}
            <div
              onClick={handlePromenadeSeatingClick}
              className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0 group cursor-pointer hover:bg-white/40 rounded-xl p-2 transition-all"
              title="Click Here to explore our Beachfront & Promenade Gallery"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePromenadeSeatingClick(e as unknown as React.MouseEvent)}
              id="quick-info-promenade-seating"
            >
              <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0070E0] group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0070E0] transition-colors">
                    PROMENADE SEATING
                  </p>
                  <button
                    type="button"
                    onClick={handlePromenadeSeatingClick}
                    className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-black text-[10px] sm:text-[11px] font-heading font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm border border-amber-500/50 tracking-wide inline-flex items-center gap-1 shrink-0 transition-transform group-hover:scale-105 cursor-pointer"
                    title="Click Here to view our Gallery"
                  >
                    <span>CLICK HERE</span>
                    <span className="text-[11px]">➔</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                  Takeaway &amp; Beach Terrace
                </p>
              </div>
            </div>

            {/* 3. BEACH HIRE - Click takes to Beach Hire Section */}
            <div
              onClick={handleBeachHireClick}
              className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0 group cursor-pointer hover:bg-white/40 rounded-xl p-2 transition-all"
              title="Click Here to view our Beach Hire options (Deckchairs, Windbreaks & Sunbeds)"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleBeachHireClick(e as unknown as React.MouseEvent)}
              id="quick-info-beach-hire"
            >
              <div className="w-11 h-11 rounded-full bg-amber-400/20 border-2 border-amber-500/80 flex items-center justify-center shrink-0 text-amber-600 group-hover:bg-[#0070E0] group-hover:text-white group-hover:border-[#0070E0] transition-colors">
                <Umbrella className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0070E0] transition-colors">
                    BEACH HIRE
                  </p>
                  <button
                    type="button"
                    onClick={handleBeachHireClick}
                    className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-black text-[10px] sm:text-[11px] font-heading font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm border border-amber-500/50 tracking-wide inline-flex items-center gap-1 shrink-0 transition-transform group-hover:scale-105 cursor-pointer"
                    title="Click Here to explore our Beach Hire service"
                  >
                    <span>CLICK HERE</span>
                    <span className="text-[11px]">➔</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                  Deckchairs, Windbreaks &amp; Beds
                </p>
              </div>
            </div>

            {/* 4. CONTACT / CALL US */}
            <div className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0">
              <a
                href="tel:+447554663569"
                className="flex items-center gap-3.5 sm:gap-4 group w-full"
                title="Call Frankie's"
              >
                <div className="w-11 h-11 rounded-full border-2 border-[#0070E0] flex items-center justify-center shrink-0 text-[#0070E0] group-hover:bg-[#0070E0] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0070E0] transition-colors">
                    CONTACT
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5 whitespace-nowrap">
                    +44 7554 663569
                  </p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* RAMSGATE MAIN SANDS MODAL (Shown when clicking Ramsgate Main Sands) */}
      {isBeachModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsBeachModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ramsgate-modal-title"
        >
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border-2 border-amber-300/80 my-auto relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <div className="absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={() => setIsBeachModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-sm active:scale-95"
                title="Close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-y-auto flex-1">
              {/* Top Banner with Sandy Beach Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-sky-100">
                <img
                  src="/ramsgate-main-sands-beach.jpg"
                  alt="Ramsgate Main Sands Sunny Golden Beach"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to beach hire banner if needed
                    (e.target as HTMLImageElement).src = '/frankies-beach-hire-banner.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Beach Location Badges */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2">
                  <span className="bg-amber-400 text-black text-[10px] sm:text-xs font-heading font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Waves className="w-3.5 h-3.5 text-blue-900" />
                    <span>RAMSGATE MAIN SANDS</span>
                  </span>
                  <span className="bg-white/95 text-[#0070E0] text-[10px] sm:text-xs font-heading font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500 fill-current" />
                    <span>AWARD-WINNING BEACH</span>
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-white">
                  <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading">
                    KIOSK 1, MARINA ESPLANADE • RAMSGATE, KENT CT11 8LS
                  </p>
                  <h3 id="ramsgate-modal-title" className="text-xl sm:text-3xl font-heading font-black uppercase text-white mt-0.5 tracking-tight">
                    Ramsgate Main Sands
                  </h3>
                </div>
              </div>

              {/* Informative Text Body */}
              <div className="p-5 sm:p-7 space-y-4 text-gray-800">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0070E0] font-heading">
                  <MapPin className="w-4 h-4 text-[#D1A03F]" />
                  <span>Right on the Promenade &amp; Shoreline</span>
                </div>

                <h4 className="text-lg sm:text-xl font-heading font-extrabold uppercase text-[#000000] leading-snug">
                  One of Britain’s Most Beloved Golden Sandy Beaches
                </h4>

                <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                  <strong className="text-black">Ramsgate Main Sands</strong> is renowned for its vast, clean golden sands, safe bathing waters, and picturesque chalk cliffs overlooking the English Channel and the historic Royal Harbour.
                </p>

                <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                  <strong className="text-black">Frankie's @ The Beach</strong> is proudly positioned directly on the promenade at <span className="text-[#0070E0] font-bold">Kiosk 1</span>, just paces from where the waves kiss the shore. Whether you want to relax on our traditional striped beach deckchairs, shelter with sturdy windbreaks, or enjoy our award-winning steak burgers, hot sugared donuts, loaded chips, and ice-cold draught beers, Frankie's is your complete seaside home on the sands.
                </p>

                {/* Beach Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="bg-[#f8f9f5] border border-[#e4e8dd] p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-xl">🏖️</span>
                    <div>
                      <h5 className="font-heading font-black text-xs uppercase text-black">Soft Golden Sand</h5>
                      <p className="text-[11px] text-[#556d75] mt-0.5">Expansive clean sandy beach perfect for families, sunbathing and castle building.</p>
                    </div>
                  </div>

                  <div className="bg-[#f8f9f5] border border-[#e4e8dd] p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-xl">⛱️</span>
                    <div>
                      <h5 className="font-heading font-black text-xs uppercase text-black">Beach Hire On Site</h5>
                      <p className="text-[11px] text-[#556d75] mt-0.5">Rent deckchairs, windbreaks, parasols, and sunloungers directly at Kiosk 1.</p>
                    </div>
                  </div>

                  <div className="bg-[#f8f9f5] border border-[#e4e8dd] p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-xl">🍔</span>
                    <div>
                      <h5 className="font-heading font-black text-xs uppercase text-black">Award-Winning Food &amp; Bar</h5>
                      <p className="text-[11px] text-[#556d75] mt-0.5">6oz steak burgers, footlong long dogs, 20-flavour donuts, cold draught beers &amp; slushies.</p>
                    </div>
                  </div>

                  <div className="bg-[#f8f9f5] border border-[#e4e8dd] p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-xl">🎡</span>
                    <div>
                      <h5 className="font-heading font-black text-xs uppercase text-black">Attractions &amp; Rides</h5>
                      <p className="text-[11px] text-[#556d75] mt-0.5">Children's fairground rides and trampolines right by our promenade kiosk.</p>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 border-t border-[#dde0d5] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kiosk+1+Marina+Esplanade+Ramsgate+CT11+8LS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0070E0] hover:bg-[#005FCE] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>Get Directions / Map</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsBeachModalOpen(false);
                        navigate('/menu');
                      }}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm"
                    >
                      View Seaside Menu
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBeachModalOpen(false)}
                      className="bg-[#EEEFE9] hover:bg-[#e4e7dc] text-black font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-[#dde0d5] transition-all cursor-pointer active:scale-95"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
