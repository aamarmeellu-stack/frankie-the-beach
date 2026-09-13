import React, { useState } from 'react';
import { Trophy, ExternalLink, Sparkles, Newspaper, ArrowRight, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { NATIONAL_AWARD_DATA, EXTRA_MILE_AWARD_DATA, TRIPADVISOR_LINKS } from '../data/restaurantData';

export const NationalAwardBanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sun' | 'service'>('sun');

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#142125] via-[#1a2d33] to-[#121e22] text-white py-8 sm:py-10 border-y border-[#c89e3a]/30 shadow-md"
      id="national-award-banner"
    >
      {/* Subtle background ambiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D1A03F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#0580FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Award Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('sun')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sun'
                ? 'bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-black shadow-md'
                : 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/10'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Tripadvisor UK Best of the Best</span>
            <span className="text-[10px] bg-black/30 text-white px-1.5 py-0.2 rounded font-bold">In The Sun</span>
          </button>

          <button
            onClick={() => setActiveTab('service')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'service'
                ? 'bg-gradient-to-r from-[#0580FF] to-[#004fb3] text-white shadow-md border border-sky-300/40'
                : 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>2024 Extra Mile Award Winner</span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">Customer Service</span>
          </button>
        </div>

        {/* Tab 1: The Sun & Tripadvisor Best of the Best */}
        {activeTab === 'sun' && (
          <div className="bg-white/5 border border-amber-400/30 rounded-3xl p-5 sm:p-7 backdrop-blur-md animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-black font-heading font-black text-xs uppercase tracking-wider shadow-sm">
                    <Trophy className="w-3.5 h-3.5 fill-black" />
                    Tripadvisor Best of the Best 2024
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    UK Top Seaside Winner
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 bg-sky-400/15 border border-sky-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <Newspaper className="w-3 h-3" />
                    Featured in The Sun
                  </span>
                </div>

                <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight leading-tight">
                  "{NATIONAL_AWARD_DATA.quote}"
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                  Honoured in Tripadvisor's prestigious <strong className="text-amber-200">Travellers' Choice Best of the Best awards</strong>, putting our humble Ramsgate beachfront food kiosk &amp; bar on the national map as one of the best seaside spots in Great Britain.
                </p>

                <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-white text-sm">4.9 / 5.0</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span>Over 750+ 5-Star Reviews on Tripadvisor</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href={NATIONAL_AWARD_DATA.sunArticleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#d61e27] hover:bg-[#b5141d] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-center cursor-pointer border border-white/20 active:scale-95"
                  id="btn-read-the-sun-article"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Read Feature in The Sun</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={TRIPADVISOR_LINKS.restaurant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 text-black font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-center cursor-pointer active:scale-95"
                  id="btn-view-tripadvisor-award"
                >
                  <Trophy className="w-4 h-4 text-black" />
                  <span>View On Tripadvisor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: 2024 Extra Mile Award for Customer Service */}
        {activeTab === 'service' && (
          <div className="bg-white/5 border border-sky-400/40 rounded-3xl p-5 sm:p-7 backdrop-blur-md animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#0580FF] to-[#004fb3] text-white font-heading font-black text-xs uppercase tracking-wider shadow-sm border border-sky-300/40">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    2024 Extra Mile Award Winner
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <Trophy className="w-3 h-3" />
                    1066 Business Awards
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-400/15 border border-emerald-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <HeartHandshake className="w-3 h-3" />
                    Gold Standard Customer Service
                  </span>
                </div>

                <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight leading-tight">
                  "Celebrating an organisation that goes above &amp; beyond for customers"
                </h2>

                {/* Judge Quote */}
                <div className="p-3.5 rounded-2xl bg-white/5 border-l-4 border-amber-400 space-y-1">
                  <p className="text-xs sm:text-sm italic text-gray-200 leading-relaxed">
                    "{EXTRA_MILE_AWARD_DATA.quote}"
                  </p>
                  <p className="text-[11px] font-bold text-amber-300">
                    — {EXTRA_MILE_AWARD_DATA.quoteAuthor}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                  {EXTRA_MILE_AWARD_DATA.summary} {EXTRA_MILE_AWARD_DATA.sponsor}.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-sky-200">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dedicated Staff &amp; Warm Welcomes</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Putting Customers &amp; Families First</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center border border-amber-400/40">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase text-white">
                    Gold Standard Customer Care
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-normal">
                    Recognised across the region for hospitality and service that goes the extra mile every single day on Ramsgate beach.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
