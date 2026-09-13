import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { QuickInfoBar } from '../components/QuickInfoBar';
import { ChefsFavorites } from '../components/ChefsFavorites';
import { NationalAwardBanner } from '../components/NationalAwardBanner';
import { WhatPeopleSay } from '../components/WhatPeopleSay';
import { CateringShowcase } from '../components/CateringShowcase';
import {
  Utensils,
  Calendar,
  UtensilsCrossed,
  ArrowRight,
  Flame,
  Clock,
  MapPin,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Check,
  Heart,
  HandHeart,
} from 'lucide-react';
import { ASSETS, OFFICIAL_MENU, CLIENT_IMAGES } from '../data/restaurantData';
import { ClientImage } from '../components/ClientImage';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { TripAdvisorAttractionsBanner } from '../components/TripAdvisorBanner';
import { useImages } from '../context/ImageContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { clientImages } = useImages();

  const handleWhatsAppContact = () => {
    const phoneNumber = '447554663569';
    const message = encodeURIComponent(
      "Hello Frankie's @ The Beach! 🌊🍔 I'd like to ask about your opening times and seaside menu today."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 bg-[#EEEFE9]">
      {/* 1. Hero Section */}
      <Hero
        onExploreMenu={() => navigate('/menu')}
        onContact={() => navigate('/contact')}
      />

      {/* 2. Quick Info Bar */}
      <QuickInfoBar />

      {/* 2.5 National Award Winner Spotlight (The Sun & Tripadvisor Best of the Best) */}
      <NationalAwardBanner />

      {/* 3. Chef's Favorites Showcase */}
      <ChefsFavorites
        onViewFullMenu={() => navigate('/menu')}
      />

      {/* 4. Feature Showcase / Food Kiosk & Bar Teaser */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-[#dde0d5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#004fb3]">
                <ClientImage
                  src={clientImages.kiosk}
                  slotKey="site:kiosk"
                  fallbackSrc={ASSETS.beachPatio}
                  alt="Frankie's Beachfront Food Kiosk and Bar in Ramsgate"
                  className="w-full h-80 sm:h-96 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] text-[11px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    UK'S #1 QUICK BITE (TRIPADVISOR)
                  </span>
                  <p className="font-heading font-extrabold text-xl sm:text-2xl mt-2 text-white">
                    Right on the sands of Ramsgate Beach
                  </p>
                </div>
              </div>

              {/* Floating Polaroids / Pill */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#dde0d5] flex items-center gap-3 max-w-xs">
                <ClientImage
                  src={clientImages.food1Burger}
                  slotKey="menu:beef-burger"
                  fallbackSrc={ASSETS.fallbacks.heroBurger}
                  alt="Gourmet 6oz Steak Burger"
                  className="w-14 h-14 rounded-xl object-cover"
                  priority
                />
                <div>
                  <div className="flex items-center gap-1 text-[#D1A03F]">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0580FF]">
                      100% Prime Beef
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                    Gourmet 6oz Steak
                  </h4>
                  <p className="text-[11px] text-gray-500">Cooked to juicy perfection</p>
                </div>
              </div>
            </div>

            {/* Right Story & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0580FF] font-heading">
                <span className="text-base">🌊</span>
                <span>FUN, FOOD, DRINKS &amp; SEASIDE VIBES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#000000] font-heading leading-tight">
                RIGHT ON THE MAIN SANDS OF OUR AWARD-WINNING BEACH.
              </h2>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                <strong className="text-[#000000]">Frankies At The Beach</strong> is the ultimate seaside destination for fun, food, and good times! From thrilling fair rides for the children to our award-winning quick bites, a well-stocked bar for the adults, giant 99 whippy ice creams, fresh warm doughnuts, and great music — everything you love about the seaside is right here in one fantastic location.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <span className="text-2xl shrink-0">🎡</span>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Fun Fair Rides
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      Great fun for the kids right by the waves!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <span className="text-2xl shrink-0">🍔</span>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Award-Winning Quick Bites
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      Gourmet steak burgers &amp; footlong hot dogs served fast.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <span className="text-2xl shrink-0">🍻</span>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Well-Stocked Bar
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      Cold draft beers, ciders, wine &amp; refreshing seaside cocktails.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8f9f5] border border-[#e4e8dd]">
                  <span className="text-2xl shrink-0">🍦</span>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase">
                      Massive Ice Cream Choice
                    </h4>
                    <p className="text-[11px] text-[#556d75] mt-0.5">
                      99 whippies with Flakes, tubs &amp; so many flavours to choose from!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/menu"
                  className="bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>COME AND ENJOY FRANKIES</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/about"
                  className="bg-[#EEEFE9] hover:bg-[#e6eadf] text-[#000000] font-heading font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-[#dde0d5] transition-all cursor-pointer"
                >
                  READ OUR STORY
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Menu Categories Teaser (Direct access to all categories) */}
      <section className="py-16 sm:py-20 bg-[#edf0e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0580FF] font-heading">
              WHAT ARE YOU CRAVING TODAY?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#000000] font-heading mt-1">
              EXPLORE OUR SEASIDE SPECIALS
            </h2>
            <div className="flex items-center justify-center gap-2 my-3 text-[#D1A03F]">
              <div className="h-0.5 w-6 bg-[#D1A03F]/50 rounded-full" />
              <UtensilsCrossed className="w-4 h-4 text-[#D1A03F]" />
              <div className="h-0.5 w-6 bg-[#D1A03F]/50 rounded-full" />
            </div>
            <p className="text-sm text-[#496068]">
              From gourmet footlong hot dogs to traditional 99 whippy cones with Flakes, discover what makes Frankie's Ramsgate's favourite food kiosk and bar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {/* Category Card 1: Burgers */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.food1Burger}
                  slotKey="menu:beef-burger"
                  fallbackSrc={ASSETS.fallbacks.heroBurger}
                  alt="Gourmet 6oz Steak Burgers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  GOURMET 6oz STEAK BURGERS
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Gourmet 6oz Steak Burgers
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Juicy 6oz steak patties cooked to perfection with mature cheddar, thick Danish bacon, stilton, or specialty bajan sauce.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 2: Gourmet Crispy French Fries */}
            <div
              onClick={() => navigate('/menu')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dde0d5] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ClientImage
                  src={clientImages.pepperoniFries}
                  slotKey="menu:pepperoni-cheese-loaded-fries"
                  fallbackSrc={ASSETS.loadedFries}
                  alt="Gourmet Crispy French Fries"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0580FF] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                  CRISPY FRENCH FRIES
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0580FF] transition-colors">
                    Gourmet Crispy Fries
                  </h3>
                  <p className="text-xs text-[#526b74] mt-1 line-clamp-2">
                    Golden French fries loaded with mature cheddar torched to perfection, with bacon, chorizo, pepperoni, or southern fried chicken.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#edf0e6] flex items-center justify-between text-xs font-bold text-[#0580FF]">
                  <span>View Selection</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>VIEW FULL SEASIDE MENU</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Beach Catering & Private Hire Video Showcase */}
      <CateringShowcase />

      {/* Mid-Page Showcase: Children's Beach Rides & Attractions Official TripAdvisor Banner */}
      <TripAdvisorAttractionsBanner className="!my-0" />

      {/* 6. What People Say (Customer reviews showcase) */}
      <WhatPeopleSay
        onViewAllReviews={() => navigate('/reviews')}
        onOpenGallery={() => navigate('/gallery')}
      />

      {/* Giving Back & Community Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12" id="home-charity-spotlight">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dde0d5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0580FF] font-heading bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                <HandHeart className="w-4 h-4 text-[#D1A03F]" />
                <span>CHARITY &amp; COMMUNITY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#000000] font-heading leading-tight">
                WHY GIVING BACK HAS ALWAYS MATTERED
              </h2>

              <p className="text-xs sm:text-sm text-[#D1A03F] font-heading font-extrabold uppercase tracking-wider">
                — A personal message from Frankie Fernando
              </p>

              <p className="text-sm sm:text-base text-[#496068] leading-relaxed">
                "For me, business has never been just about making money. It has always been about people, relationships, providing opportunities, supporting local communities and, whenever I can, helping someone who needs it."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#000000] font-bold">
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <Heart className="w-4 h-4 text-[#D1A03F] shrink-0" />
                  <span>Share A Little Love</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <ShieldCheck className="w-4 h-4 text-[#0580FF] shrink-0" />
                  <span>Porchlight &amp; Hospices</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f9f5] p-2.5 rounded-xl border border-[#e4e8dd]">
                  <Sparkles className="w-4 h-4 text-[#0580FF] shrink-0" />
                  <span>Local Autism Causes</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/charity"
                  className="inline-flex items-center gap-2 bg-[#0580FF] hover:bg-[#004fb3] text-white font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#D1A03F]" />
                  <span>READ FRANKIE'S FULL STORY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#f8f9f5] rounded-2xl p-6 border border-[#dde0d5] space-y-3">
              <span className="text-[11px] font-extrabold text-[#0580FF] uppercase tracking-wider font-heading block">
                Frankie's Words
              </span>
              <blockquote className="text-xs sm:text-sm italic text-[#000000] font-medium leading-relaxed">
                "Whenever I see someone struggling today, I don't look down on them. I think, 'There but for the grace of God go I.' And if I am in a position to help, then I will. That's not a marketing strategy. That's just me."
              </blockquote>
              <div className="pt-2 border-t border-[#e4e8dd] text-[11px] font-bold text-[#526b74]">
                Frankie Fernando — Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Mobile App Download Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <PWAInstallButton variant="banner" />
      </section>

      {/* 7. Call To Action: Visit & Contact Banner */}
      <section className="bg-[#004fb3] py-16 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest font-heading">
            <UtensilsCrossed className="w-4 h-4 text-amber-300" />
            <span>JOIN US BY THE SEA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase font-heading">
            PLANNING YOUR VISIT TO RAMSGATE MAIN SANDS?
          </h2>

          <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Drop by our food kiosk and bar at Kiosk 1, Marina Esplanade for gourmet 6oz steak burgers, loaded chips, cold drinks, 99 whippy cones, and kids' beach rides right on the sand. Walk-ins are always welcomed by the beach!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-normal px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Contact &amp; Get Directions
            </Link>

            <button
              onClick={handleWhatsAppContact}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>CHAT ON WHATSAPP</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
