import React, { useState, useRef, useEffect } from 'react';
import {
  Utensils,
  MapPin,
  UtensilsCrossed,
  Sandwich,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  FerrisWheel,
  Beer,
  Music,
  CircleDot,
  ArrowRight,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { ASSETS, NATIONAL_AWARD_DATA } from '../data/restaurantData';
import { ClientImage } from './ClientImage';
import { useImages } from '../context/ImageContext';

interface HeroProps {
  onExploreMenu: () => void;
  onContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onContact }) => {
  const { clientImages, slotOverrides } = useImages();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heroVideoSrc =
    slotOverrides['site:heroVideo'] ||
    slotOverrides['heroVideo'] ||
    clientImages.heroVideo ||
    ASSETS.heroVideo ||
    '/hero-video.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle mobile autoplay restriction
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [heroVideoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2">
      <section
        id="home"
        className="relative text-white pt-8 sm:pt-14 pb-20 sm:pb-32 overflow-hidden bg-[#0580FF] rounded-3xl shadow-lg border border-white/10"
      >
      {/* 1. Full Beach Ocean Background (Video with Image Poster Fallback) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image Poster (Immediate, zero layout shift, seamless fallback) */}
        <div className="absolute inset-0 z-0">
          {clientImages.heroBg ? (
            <ClientImage
              src={clientImages.heroBg}
              slotKey="site:heroBg"
              fallbackSrc=""
              alt="Frankie's Beach"
              className="w-full h-full object-cover object-center"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0580FF] via-[#004fb3] to-[#002d66]" />
          )}
        </div>

        {/* Ambient Hero Video Loop */}
        {!videoError && heroVideoSrc && (
          <video
            ref={videoRef}
            src={heroVideoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-[1] ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Crisp, subtle contrast gradient: Keeps the video vibrant and clear while ensuring high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 z-[2]" />
      </div>

      {/* Live Video Control Badge */}
      {!videoError && isVideoLoaded && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all text-xs font-medium text-white shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline uppercase tracking-wider text-[10px] font-bold text-white/90">
            Beach Video
          </span>
          <button
            onClick={togglePlay}
            className="p-1 hover:text-[#ECD87A] transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-1 hover:text-[#ECD87A] transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Magical Welcoming Headlines & Story */}
          <div className="lg:col-span-7 text-left pt-2 lg:pt-0">
            
            {/* National Award & Seaside Location Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <a
                href={NATIONAL_AWARD_DATA.sunArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D1A03F]/90 via-[#ECD87A]/90 to-[#D1A03F]/90 hover:from-[#ECD87A] hover:to-[#D1A03F] text-[#000000] px-3.5 py-1.5 rounded-full font-heading font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95 group border border-amber-200/80"
                title="Read The Sun feature on Frankie's winning Tripadvisor UK Best of the Best"
                id="hero-national-award-pill"
              >
                <Trophy className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                <span>Tripadvisor UK Best of the Best Winner</span>
                <span className="bg-black/85 text-[#ECD87A] text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-normal">
                  In The Sun
                </span>
                <ExternalLink className="w-3 h-3 text-[#000000]/70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 text-[11px] font-bold text-white shadow-sm">
                <span className="text-amber-300 text-xs">🌊</span>
                <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-heading text-amber-200 font-black">
                  RAMSGATE MAIN SANDS
                </span>
              </div>
            </div>

            {/* The Big Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-impact tracking-tight uppercase leading-[0.95] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#ECD87A] to-[#D1A03F] block sm:inline">
                Frankies At The Beach!
              </span>
            </h1>

            {/* Powerful Sub-headline */}
            <p className="mt-4 text-base sm:text-xl font-medium text-white/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] max-w-2xl">
              Right on the main sands of our award-winning beach, <span className="font-extrabold text-[#FFF2B2]">Frankies At The Beach</span> is the perfect place for <span className="text-white underline decoration-[#ECD87A] decoration-2 underline-offset-4">fun, food and good times!</span>
            </p>

            {/* Magical Highlights Grid / Badges */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl">
              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🎡</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Fun Fair Rides</span>
                  <p className="text-[11px] text-white/80">Great fun for the kids!</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🍔</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Award-Winning Quick Bites</span>
                  <p className="text-[11px] text-white/80">Tasty food served fast.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🍻</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Well-Stocked Bar</span>
                  <p className="text-[11px] text-white/80">Something for everyone.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🍟</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Gourmet Loaded Fries</span>
                  <p className="text-[11px] text-white/80">Hot golden chips piled high with delicious toppings.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🍩</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Fresh Doughnuts</span>
                  <p className="text-[11px] text-white/80">Loaded with a fantastic choice of toppings.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-black/35 hover:bg-black/45 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors">
                <span className="text-lg">🎶</span>
                <div className="leading-tight">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Great Music</span>
                  <p className="text-[11px] text-white/80">Sit back, relax and enjoy the atmosphere.</p>
                </div>
              </div>
            </div>

            {/* Tagline Callout */}
            <div className="mt-5 flex items-center gap-2 text-white font-heading font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-[#ECD87A] shrink-0" />
              <span>Fun, food, drinks &amp; seaside vibes – all in one fantastic location!</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreMenu}
                id="btn-explore-menu"
                className="bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>EXPLORE OUR SEASIDE MENU</span>
                <Utensils className="w-4 h-4 text-[#000000] group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={onContact}
                id="btn-hero-contact"
                className="bg-[#004fb3]/80 hover:bg-[#004fb3] active:scale-95 text-white font-normal text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl border border-white/60 shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group cursor-pointer backdrop-blur-xs"
              >
                <span>Come &amp; Enjoy Frankies</span>
                <MapPin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Polaroid Collage & Stamp Badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[480px] h-[460px] sm:h-[520px]">
              
              {/* White Artistic Paint Splatter / Seafoam Textures Behind Polaroids */}
              <div className="absolute inset-0 pointer-events-none select-none z-0">
                <svg viewBox="0 0 500 500" className="w-full h-full opacity-60 filter blur-[0.3px]" fill="white">
                  <path d="M120,240 C140,210 180,210 220,225 C260,240 310,210 360,220 C410,230 450,260 440,310 C430,360 400,390 350,405 C300,420 250,395 210,410 C170,425 130,410 110,380 C90,350 95,300 105,270 Z" opacity="0.35" />
                  <path d="M220,130 C270,110 320,125 365,150 C410,175 440,210 430,260 C420,310 370,330 330,310 C290,290 260,315 220,300 C180,285 170,250 185,210 C200,170 180,145 220,130 Z" opacity="0.4" />
                  <circle cx="100" cy="220" r="14" opacity="0.5" />
                  <circle cx="85" cy="250" r="8" opacity="0.4" />
                  <circle cx="450" cy="200" r="12" opacity="0.5" />
                  <circle cx="470" cy="230" r="6" opacity="0.4" />
                  <circle cx="440" cy="390" r="16" opacity="0.4" />
                  <circle cx="130" cy="420" r="12" opacity="0.3" />
                  <circle cx="390" cy="110" r="9" opacity="0.45" />
                </svg>
              </div>

              {/* Polaroid 2 (Top-Right): Frankie's Beachfront Kiosk */}
              <div
                className="absolute right-0 sm:right-2 top-2 sm:top-4 w-48 sm:w-56 bg-white p-2.5 pb-6 shadow-[0_20px_45px_rgba(0,0,0,0.45)] rounded-[2px] transform rotate-[6deg] hover:rotate-3 transition-transform duration-300 z-10 group cursor-pointer"
                onClick={onExploreMenu}
                title="Frankie's Beachfront Kiosk"
              >
                <div className="overflow-hidden aspect-square bg-[#006ee0]">
                  <ClientImage
                    src={clientImages.kiosk || ASSETS.kiosk}
                    slotKey="site:kiosk"
                    fallbackSrc={ASSETS.kiosk}
                    alt="Frankie's Beachfront Kiosk on Ramsgate Beach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Polaroid 1 (Center-Left): Main Cheeseburger */}
              <div
                className="absolute left-1 sm:left-2 top-8 sm:top-10 w-56 sm:w-72 bg-white p-3 sm:p-3.5 pb-8 sm:pb-9 shadow-[0_28px_60px_rgba(0,0,0,0.55)] rounded-[2px] transform -rotate-[4deg] hover:-rotate-1 transition-transform duration-300 z-20 group cursor-pointer"
                onClick={onExploreMenu}
                title="Gourmet Cheeseburger at the beach"
              >
                <div className="overflow-hidden aspect-square bg-[#004fb3]">
                  <ClientImage
                    src={clientImages.heroBurger || ASSETS.heroBurger}
                    slotKey="site:heroBurger"
                    fallbackSrc={ASSETS.heroBurger}
                    alt="Towering gourmet double bacon cheeseburger by the ocean"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Polaroid 3 (Bottom-Right): Pepperoni & Mature Cheddar Loaded Chips */}
              <div
                className="absolute right-2 sm:right-4 bottom-4 sm:bottom-6 w-44 sm:w-52 bg-white p-2.5 pb-6 shadow-[0_22px_50px_rgba(0,0,0,0.48)] rounded-[2px] transform -rotate-[6deg] hover:rotate-0 transition-transform duration-300 z-30 group cursor-pointer"
                onClick={onExploreMenu}
                title="Pepperoni & Mature Cheddar Loaded Chips"
              >
                <div className="overflow-hidden aspect-square bg-[#003680]">
                  <ClientImage
                    src={clientImages.pepperoniFries || ASSETS.loadedFries}
                    slotKey="site:pepperoniFries"
                    fallbackSrc={ASSETS.loadedFries}
                    alt="Pepperoni & Mature Cheddar Loaded Chips in beach carton"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Circular Stamp Badge: FRANKIES AT THE BEACH ★ RAMSGATE */}
              <div
                className="absolute left-0 sm:left-4 top-[240px] sm:top-[260px] z-40 stamp-badge pointer-events-auto"
                title="Frankies At The Beach Ramsgate"
              >
                <div className="w-26 h-26 sm:w-30 sm:h-30 rounded-full bg-white border-2 border-dashed border-[#0580FF] p-1.5 flex items-center justify-center relative shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                  {/* Outer circular text simulated with SVG */}
                  <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePathTop"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[8px] font-extrabold uppercase tracking-[0.14em] fill-[#0580FF]">
                      <textPath href="#circlePathTop" startOffset="0%">
                        FRANKIES AT THE BEACH ★ RAMSGATE ★
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Beach & Fun Icon */}
                  <div className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#f0f9fa] flex items-center justify-center border border-[#0580FF]/20">
                    <Sparkles className="w-5 h-5 text-[#0580FF] fill-current" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Clean Angled Transition into Cream Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-10 lg:h-12 object-cover text-[#EEEFE9]"
          preserveAspectRatio="none"
        >
          <polygon points="0,36 1440,0 1440,36" fill="#EEEFE9" />
        </svg>
      </div>
    </section>
  </div>
  );
};
