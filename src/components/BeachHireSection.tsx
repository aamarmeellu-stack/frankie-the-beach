import React, { useState } from 'react';
import {
  Umbrella,
  Shield,
  Sun,
  Armchair,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
  Compass,
  Waves
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HireItem {
  id: string;
  name: string;
  signageName: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  badge: string;
}

const HIRE_ITEMS: HireItem[] = [
  {
    id: 'deckchairs',
    name: 'Deck Chairs',
    signageName: "DECK CHAIR'S",
    tagline: 'Classic British seaside comfort',
    description:
      'Traditional folding wooden beach deckchairs with nautical blue-and-white striped heavy-duty canvas. Perfect for reclining with panoramic views of the English Channel and Ramsgate Royal Harbour.',
    features: [
      '3-position adjustable recline',
      'Sturdy traditional FSC hardwood frame',
      'Lightweight & easy to set up on the sand',
      'Pair with a cold pint or 568ml slushy'
    ],
    icon: Armchair,
    badge: 'Seaside Classic'
  },
  {
    id: 'windbreaks',
    name: 'Windbreaks',
    signageName: "WINDBREAK'S",
    tagline: 'Coastal breeze shelter & privacy',
    description:
      'Sturdy multi-pole striped seaside windbreaks with solid wooden stakes. Blocks the coastal sea breeze, prevents sand drift, and creates your family’s cozy private beach basecamp on Ramsgate sands.',
    features: [
      'Multi-panel heavy-duty canvas',
      'Deep-ground wooden stakes for secure sand anchoring',
      'Shelters picnic blankets & young children',
      'Traditional vibrant seaside stripes'
    ],
    icon: Shield,
    badge: 'Family Essential'
  },
  {
    id: 'parasols',
    name: 'Parasols',
    signageName: "PARASOL'S",
    tagline: 'UV-safe cool beach shade',
    description:
      'Wide-canopy sun parasols designed specifically for seaside conditions with spiral sand anchoring tips. Essential for keeping babies, kids, food, and drinks out of direct midday sunshine.',
    features: [
      'High UV-protection fabric canopy',
      'Tilt adjustment to follow the sun',
      'Spiral sand anchor for coastal breezes',
      'Compact & easy to position beside your loungers'
    ],
    icon: Umbrella,
    badge: 'Sun Protection'
  },
  {
    id: 'sunloungers',
    name: 'Sunloungers',
    signageName: 'AND SUNLOUNGERS',
    tagline: 'Full-length seaside relaxation',
    description:
      'Full-length reclinable beach sunloungers for soaking up the glorious sunshine on Ramsgate beach. Lay completely back to hear the gentle waves or sit elevated to read and people-watch.',
    features: [
      'Multi-angle backrest including lie-flat mode',
      'Breathable, quick-dry seaside mesh fabric',
      'Generous length for complete head-to-toe comfort',
      'Just paces from Frankie’s bar & loaded chips'
    ],
    icon: Sun,
    badge: 'Ultimate Comfort'
  }
];

export const BeachHireSection: React.FC = () => {
  const [selectedImageModal, setSelectedImageModal] = useState(false);

  const handleWhatsAppHire = (itemName?: string) => {
    const text = itemName
      ? `Hello Frankie's @ The Beach! 🏖️ I'm heading down to Ramsgate beach and would like to enquire about hiring ${itemName} today.`
      : "Hello Frankie's @ The Beach! 🏖️ I'm heading down to Ramsgate beach and would like to ask about hiring deckchairs, windbreaks, parasols, or sunloungers today.";
    window.open(
      `https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      id="beach-hire"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#eef4fb] via-[#e8f1fd] to-[#EEEFE9] border-t border-b border-[#cde0f7] relative overflow-hidden"
      aria-label="Beach Equipment Hire at Frankie's"
    >
      {/* Background Decorative Waves and Sunburst glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0070E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-4 py-1.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-widest shadow-md">
            <Waves className="w-4 h-4 text-amber-300" />
            <span>RAMSGATE BEACHFRONT SERVICES</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight uppercase">
            WE ALSO HIRE FOR THE BEACH
          </h2>

          <p className="text-sm sm:text-base text-[#4a6375] font-medium leading-relaxed">
            Planning a sunny day on Ramsgate Sands? Travel light and hire everything you need
            straight from <strong className="text-[#000000]">Frankie's Beach Kiosk</strong> — right on the promenade, paces from the tide!
          </p>
        </div>

        {/* 1. Authentic Retro Banner Display Showcase */}
        <div className="mb-12 sm:mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[radial-gradient(ellipse_at_50%_35%,#0084FF_0%,#0070E0_50%,#0048B8_100%)] group">
            {/* Banner Image */}
            <div className="relative aspect-[16/6] sm:aspect-[16/5] md:aspect-[21/6] w-full overflow-hidden bg-sky-100 flex items-center justify-center">
              <img
                src="/frankies-beach-hire-banner.jpg"
                alt="Frankie's @ The Beach Also Hire - Deck Chairs, Windbreaks, Parasols and Sunloungers"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 cursor-pointer"
                onClick={() => setSelectedImageModal(true)}
              />

              {/* Enlarge Trigger */}
              <button
                type="button"
                onClick={() => setSelectedImageModal(true)}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/70 hover:bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Click Here to enlarge banner photo"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Click Here to Enlarge</span>
              </button>

              {/* Corner Live Availability Pill */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 text-[#0048B8] px-3.5 py-1 rounded-full text-xs font-heading font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available Daily at Kiosk 1</span>
              </div>
            </div>

            {/* Banner Quick Ribbons */}
            <div className="bg-gradient-to-r from-[#0048B8] via-[#0070E0] to-[#0048B8] px-4 py-3 sm:py-3.5 text-white flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Kiosk 1, Marina Esplanade • Directly on the Sands</span>
              </div>
              <div className="flex items-center gap-2 text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Collect at the Kiosk • No Pre-Booking Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. The 4 Hire Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {HIRE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-[#cde0f7] shadow-sm hover:shadow-xl hover:border-[#0070E0]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0070E0] via-[#5cb3ff] to-[#0070E0] opacity-80 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header & Icon */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0070E0]/10 text-[#0070E0] flex items-center justify-center group-hover:bg-[#0070E0] group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-[#8C6F2B] border border-amber-200/80">
                      {item.badge}
                    </span>
                  </div>

                  {/* Item Signage Title & Real Name */}
                  <h3 className="font-heading font-black text-xl text-[#000000] uppercase tracking-wide group-hover:text-[#0070E0] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-[11px] font-extrabold uppercase text-[#0070E0] tracking-wider mb-2">
                    Signage: "{item.signageName}"
                  </div>

                  <p className="text-xs text-[#5a7182] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 border-t border-[#edf3fa] pt-3.5 mb-5">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#304855]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hire CTA Button */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppHire(item.name)}
                  className="w-full bg-[#f0f6ff] hover:bg-[#0070E0] text-[#0070E0] hover:text-white text-xs font-heading font-extrabold uppercase tracking-wider py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  title={`Click Here to enquire for ${item.name} hire on WhatsApp`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Click Here to Enquire</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* 3. How It Works / Beach Day Guide Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#cde0f7] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-[#0070E0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>HOW BEACH HIRE WORKS AT FRANKIE'S</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#000000] uppercase">
                Step off the promenade, set up in seconds
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#e1eaf3] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#0070E0] text-white flex items-center justify-center font-heading font-black text-xs">
                    1
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Pop by Kiosk 1
                  </h4>
                  <p className="text-xs text-[#526b74]">
                    Find us on Marina Esplanade. Ask the team at the counter for deckchairs, windbreaks, parasols, or sunbeds.
                  </p>
                </div>

                <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#e1eaf3] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#0070E0] text-white flex items-center justify-center font-heading font-black text-xs">
                    2
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Pick Your Beach Spot
                  </h4>
                  <p className="text-xs text-[#526b74]">
                    Pitch on Ramsgate sands just paces away. Enjoy full sun or cool breeze shade all afternoon.
                  </p>
                </div>

                <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#e1eaf3] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#0070E0] text-white flex items-center justify-center font-heading font-black text-xs">
                    3
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-[#000000] uppercase">
                    Grab Lunch &amp; Drinks
                  </h4>
                  <p className="text-xs text-[#526b74]">
                    Pair your beach lounger with a 6oz cheeseburger, loaded chips, ice-cold Cruzcampo pint, or slushy!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Column */}
            <div className="lg:col-span-4 bg-[radial-gradient(ellipse_at_50%_35%,#0084FF_0%,#0070E0_50%,#0048B8_100%)] rounded-2xl p-6 text-white space-y-4 shadow-lg text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-heading block">
                Beach Day Enquiries
              </span>
              <p className="text-sm font-medium text-white/90 leading-snug">
                Got a large family gathering or visiting Ramsgate on a hot weekend? Message us ahead on WhatsApp to check equipment availability!
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppHire()}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-heading font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Click Here to contact us on WhatsApp about beach hire"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Click Here to WhatsApp Us</span>
                </button>

                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="w-full bg-white/15 hover:bg-white/25 active:scale-95 text-white font-heading font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Call {RESTAURANT_INFO.contact.phone}</span>
                </a>
              </div>

              <div className="text-[11px] text-white/75 flex items-center justify-center sm:justify-start gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Kiosk 1, Marina Esplanade, Ramsgate CT11 8LS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Banner Zoom Modal */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImageModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#003699] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-heading font-extrabold text-sm uppercase tracking-wider">
                <Waves className="w-4 h-4 text-amber-300" />
                <span>Frankie's Beach Hire Signage</span>
              </div>
              <button
                onClick={() => setSelectedImageModal(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 bg-[#0a1b33]">
              <img
                src="/frankies-beach-hire-banner.jpg"
                alt="Frankie's Beach Hire - Deck Chairs, Windbreaks, Parasols and Sunloungers"
                className="w-full h-auto rounded-xl shadow-lg object-contain max-h-[75vh]"
              />
            </div>

            <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-700">
              <span className="font-semibold">
                Signage: "Frankie's @ the beach Also Hire • Deck Chair's • Windbreak's • Parasol's • And Sunloungers"
              </span>
              <button
                onClick={() => {
                  setSelectedImageModal(false);
                  handleWhatsAppHire();
                }}
                className="bg-[#0070E0] hover:bg-[#005FCE] text-white px-4 py-2 rounded-xl font-heading font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Enquire for Today
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
