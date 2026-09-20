import React from 'react';
import { Sandwich, Utensils, Phone, Umbrella } from 'lucide-react';

export const QuickInfoBar: React.FC = () => {
  const scrollToBeachHire = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('beach-hire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#beach-hire';
    }
  };

  return (
    <section className="bg-[#EEEFE9] py-6 sm:py-8 border-b border-[#e1e4d8]" id="info-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#dde0d5]">
          
          {/* 1. BEACHFRONT */}
          <div className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-2 sm:pt-0">
            <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0070E0]">
              <Sandwich className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading">
                RAMSGATE MAIN SANDS
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                Kiosk 1, Marina Esplanade, CT11 8LS
              </p>
            </div>
          </div>

          {/* 2. TAKEAWAY & SEASIDE TERRACE */}
          <div className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0">
            <div className="w-11 h-11 flex items-center justify-center shrink-0 text-[#0070E0]">
              <Utensils className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading">
                PROMENADE SEATING
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                Takeaway &amp; Beach Terrace
              </p>
            </div>
          </div>

          {/* 3. WE ALSO HIRE FOR THE BEACH */}
          <div className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0">
            <a
              href="#beach-hire"
              onClick={scrollToBeachHire}
              className="flex items-center gap-3.5 sm:gap-4 group cursor-pointer"
              title="We also hire deck chairs, windbreaks, parasols & sunloungers"
            >
              <div className="w-11 h-11 rounded-full bg-amber-400/20 border-2 border-amber-500/80 flex items-center justify-center shrink-0 text-amber-600 group-hover:bg-[#0070E0] group-hover:text-white group-hover:border-[#0070E0] transition-colors">
                <Umbrella className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#000000] font-heading group-hover:text-[#0070E0] transition-colors flex items-center gap-1.5">
                  <span>BEACH HIRE</span>
                  <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black tracking-normal">
                    HIRE
                  </span>
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#506870] mt-0.5">
                  Deckchairs, Windbreaks &amp; Beds
                </p>
              </div>
            </a>
          </div>

          {/* 4. CALL US */}
          <div className="flex items-center gap-3.5 sm:gap-4 sm:px-4 lg:px-6 pt-4 sm:pt-0">
            <a
              href="tel:+447554663569"
              className="flex items-center gap-3.5 sm:gap-4 group"
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
  );
};
