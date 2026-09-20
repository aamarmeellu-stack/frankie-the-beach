import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Utensils,
  MapPin,
  UtensilsCrossed,
  Sandwich,
  Play,
  Pause,
  Volume2,
  VolumeX,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heroVideoSrc =
    slotOverrides['site:heroVideo'] ||
    slotOverrides['heroVideo'] ||
    clientImages.heroVideo ||
    ASSETS.heroVideo ||
    '/hero-video.mp4';

  // Automatically start playing video on page load (muted for modern browser autoplay compliance)
  useEffect(() => {
    const video = (document.getElementById('heroVideo') as HTMLVideoElement | null) || videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Hero video autoplay muted attempt:', err);
        });
    }
  }, [heroVideoSrc]);

  // Toggle video sound or play/pause
  const toggleSound = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = (document.getElementById('heroVideo') as HTMLVideoElement | null) || videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, []);

  const startVideo = useCallback(() => {
    const video = (document.getElementById('heroVideo') as HTMLVideoElement | null) || videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    video
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Play unmuted blocked by policy, trying muted fallback:', err);
        video.muted = true;
        setIsMuted(true);
        video
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      });
  }, []);

  const stopVideo = useCallback(() => {
    const video = (document.getElementById('heroVideo') as HTMLVideoElement | null) || videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isPlaying) {
        stopVideo();
      } else {
        startVideo();
      }
    },
    [isPlaying, startVideo, stopVideo]
  );

  // Navigate directly to the 3 Frankie's Beach Moments videos section
  const handleWatchVideosClick = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    const videoSection = document.getElementById('frankies-beach-videos-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2">
      <section
        id="home"
        className="relative text-white pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#0084FF_0%,#0070E0_50%,#0042A8_100%)] rounded-3xl shadow-[0_20px_50px_rgba(0,112,224,0.4)] border-2 border-amber-300/40"
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
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_35%,#0084FF_0%,#0070E0_50%,#003E99_100%)]" />
          )}
        </div>

        {/* Ambient Hero Video Loop - Plays automatically upon page load */}
        {!videoError && heroVideoSrc && (
          <video
            id="heroVideo"
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-[1] ${
              isPlaying && isVideoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}

        {/* Powerful Frankie's Signage Blue Overlay: Electrifies the ocean video with the iconic board blue */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003699]/80 via-[#0050D8]/55 to-[#003899]/35 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002B82]/85 via-transparent to-[#0055EE]/30 z-[2]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_40%,rgba(0,119,255,0.35)_0%,transparent_75%)] z-[2] pointer-events-none" />
      </div>

      {/* Live Video Control Badge */}
      {!videoError && (
        <div className="absolute top-3 right-3 sm:top-5 sm:right-6 z-20 flex items-center gap-2">
          {isPlaying ? (
            <div className="flex items-center gap-2 bg-black/75 hover:bg-black/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/30 text-xs font-semibold text-white shadow-2xl transition-all">
              <span className="flex h-2 w-2 relative">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>

              <span className="uppercase tracking-wider text-[11px] font-extrabold text-white/95">
                {isMuted ? 'Video Live' : 'Sound On 🔊'}
              </span>

              <button
                onClick={toggleSound}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/35 text-amber-300 font-heading font-extrabold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                id="hero-mute-sound-btn"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sound On</span>
                  </>
                )}
              </button>

              <button
                onClick={togglePlay}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/15 hover:bg-white/30 text-white font-heading font-extrabold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                title="Pause Video"
                aria-label="Pause Video"
                id="hero-stop-video-top-btn"
              >
                <Pause className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>
          ) : (
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-wider shadow-2xl transition-all cursor-pointer border-2 border-white/80 animate-pulse"
              title="Click Here to Play Video"
              aria-label="Click Here to Play Video"
              id="hero-start-video-top-btn"
            >
              <Play className="w-3.5 h-3.5 fill-black text-black shrink-0" />
              <span>Play Video 🎥</span>
            </button>
          )}
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
                className="relative inline-flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#FFF0A0] via-[#ECC440] to-[#DF9B1A] hover:from-[#FFF6C0] hover:via-[#F3D156] hover:to-[#EAA928] text-[#000000] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(236,196,64,0.4)] hover:shadow-[0_8px_30px_rgba(236,196,64,0.65)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300 group border-2 border-amber-200/90 ring-2 ring-amber-300/80 hover:ring-amber-200 ring-offset-2 ring-offset-[#072448] cursor-pointer overflow-hidden select-none"
                title="Click to read The Sun's national feature on Frankie's winning Tripadvisor UK Best of the Best"
                id="hero-national-award-pill"
              >
                {/* Continuous / Hover Shimmer Sheen */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Trophy Badge */}
                <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center shrink-0 border border-black/10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Trophy className="w-3.5 h-3.5 text-[#000000]" />
                </span>

                {/* Award Title */}
                <span className="font-heading font-black text-black drop-shadow-xs">
                  <span className="hidden sm:inline">Tripadvisor UK Best of the Best Winner</span>
                  <span className="sm:hidden">UK Best of the Best Winner</span>
                </span>

                {/* Distinct Clickable Action Button Pill */}
                <span className="inline-flex items-center gap-1.5 bg-black text-[#ECD87A] group-hover:bg-[#141414] group-hover:text-white px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide shadow-xs transition-colors shrink-0 border border-black/30 ml-0.5">
                  <span>Click Here</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#ECD87A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </span>
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
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#FFF2B2]">Loaded French Fries</span>
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
                title="Explore our full food, drinks, and beach treats menu"
              >
                <span>EXPLORE MENU</span>
                <Utensils className="w-4 h-4 text-[#000000] group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={handleWatchVideosClick}
                id="btn-hero-watch-video"
                className="bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:brightness-110 active:scale-95 border-2 border-white/80 text-black font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(236,196,64,0.4)] hover:shadow-2xl transition-all flex items-center gap-2.5 group cursor-pointer backdrop-blur-md"
                title="Watch all 3 Frankie at the Beach videos in the cinema showcase below"
              >
                <Play className="w-4 h-4 fill-current text-black group-hover:scale-110 transition-transform" />
                <span>WATCH VIDEOS (3) 🎥</span>
              </button>

              <button
                onClick={onContact}
                id="btn-hero-contact"
                className="bg-[#003899]/70 hover:bg-[#003899] active:scale-95 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl border-2 border-white/70 shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer backdrop-blur-md"
                title="Find us on Marina Esplanade, Ramsgate Beach"
              >
                <span>FIND US ON THE BEACH</span>
                <MapPin className="w-4 h-4 text-[#FFF2B2] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Polaroid Collage & Stamp Badge - Made Fully Visible */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[420px] xs:max-w-[480px] sm:max-w-[540px] md:max-w-[560px] h-[500px] xs:h-[530px] sm:h-[570px] my-2">
              
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

              {/* Polaroid 1: Frankie's Beachfront Kiosk (Top-Left - Fully Visible) */}
              <div
                className="absolute left-0 sm:-left-2 top-0 sm:top-1 w-34 xs:w-40 sm:w-46 bg-white p-2 sm:p-2.5 pb-6 sm:pb-7 shadow-[0_16px_36px_rgba(0,0,0,0.45)] rounded-[2px] transform -rotate-[7deg] hover:-rotate-1 hover:scale-105 hover:z-35 transition-all duration-300 z-10 group cursor-pointer"
                onClick={onExploreMenu}
                title="Frankie's Beachfront Kiosk on Ramsgate Beach"
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
                <p className="text-center font-hand font-bold text-gray-700 text-xs sm:text-sm mt-1.5 leading-none select-none">
                  Beach Kiosk 🏖️
                </p>
              </div>

              {/* Polaroid 2: Hot Sugared Beach Donuts (Top-Right - Fully Visible) */}
              <div
                className="absolute right-0 sm:-right-2 top-0 sm:top-1 w-36 xs:w-42 sm:w-48 bg-white p-2 sm:p-2.5 pb-6 sm:pb-7 shadow-[0_20px_45px_rgba(0,0,0,0.52)] rounded-[2px] transform rotate-[6deg] hover:rotate-1 hover:scale-105 hover:z-35 transition-all duration-300 z-10 group cursor-pointer border-t border-white"
                onClick={onExploreMenu}
                title="Frankie's Famous Hot Beach Donuts & Toppings"
              >
                <div className="overflow-hidden aspect-[4/5] bg-[#FFE0B2] rounded-[1px]">
                  <img
                    src="/donut-img.jpeg"
                    alt="Frankie's Beach Donuts"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/donut img.jpeg';
                    }}
                  />
                </div>
                <p className="text-center font-hand font-bold text-gray-700 text-xs sm:text-sm mt-1.5 leading-none select-none">
                  Hot Donuts 🍩
                </p>
              </div>

              {/* Polaroid 3: CENTERPIECE Gourmet Cheeseburger (Directly in Center) */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-42 xs:w-48 sm:w-56 md:w-60 bg-white p-2.5 sm:p-3 pb-7 sm:pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.65)] rounded-[2px] transform -rotate-[1deg] hover:rotate-0 hover:scale-105 hover:z-35 transition-all duration-300 z-20 group cursor-pointer border border-white"
                onClick={onExploreMenu}
                title="Centerpiece Gourmet Burger at Frankie's"
              >
                <div className="overflow-hidden aspect-square bg-[#005FCE]">
                  <ClientImage
                    src={clientImages.heroBurger || ASSETS.heroBurger}
                    slotKey="site:heroBurger"
                    fallbackSrc={ASSETS.heroBurger}
                    alt="Gourmet Burger at Frankie's"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <p className="text-center font-hand font-bold text-gray-800 text-sm sm:text-base mt-2 leading-none select-none">
                  6oz Gourmet Burger 🍔
                </p>
              </div>

              {/* Polaroid 4: Pepperoni & Mature Cheddar Loaded Chips (Bottom-Right - Fully Visible) */}
              <div
                className="absolute right-0 sm:-right-2 bottom-0 sm:bottom-1 w-36 xs:w-42 sm:w-48 bg-white p-2 sm:p-2.5 pb-6 sm:pb-7 shadow-[0_18px_40px_rgba(0,0,0,0.48)] rounded-[2px] transform -rotate-[5deg] hover:rotate-0 hover:scale-105 hover:z-35 transition-all duration-300 z-10 group cursor-pointer"
                onClick={onExploreMenu}
                title="Loaded Chips at Frankie's"
              >
                <div className="overflow-hidden aspect-square bg-[#003680]">
                  <ClientImage
                    src={clientImages.pepperoniFries || ASSETS.loadedFries}
                    slotKey="site:pepperoniFries"
                    fallbackSrc={ASSETS.loadedFries}
                    alt="Loaded Chips at Frankie's"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <p className="text-center font-hand font-bold text-gray-700 text-xs sm:text-sm mt-1.5 leading-none select-none">
                  Loaded Fries 🍟
                </p>
              </div>

              {/* Polaroid 5: Cold Draught Pint / Alcohol From Menu (Bottom-Left - Fully Visible) */}
              <div
                className="absolute left-0 sm:-left-2 bottom-0 sm:bottom-1 w-34 xs:w-40 sm:w-46 bg-white p-2 sm:p-2.5 pb-6 sm:pb-7 shadow-[0_20px_45px_rgba(0,0,0,0.5)] rounded-[2px] transform rotate-[5deg] hover:rotate-1 hover:scale-105 hover:z-35 transition-all duration-300 z-10 group cursor-pointer"
                onClick={onExploreMenu}
                title="Seaside Bar Drink at Frankie's"
              >
                <div className="overflow-hidden aspect-square bg-[#0047AB]">
                  <ClientImage
                    src={clientImages.heroAlcohol || '/drinks/cruzcampo-pint.webp'}
                    slotKey="site:heroAlcohol"
                    fallbackSrc="/drinks/cruzcampo-pint.jpg"
                    alt="Seaside Bar Drink at Frankie's"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center font-hand font-bold text-gray-700 text-xs sm:text-sm mt-1.5 leading-none select-none">
                  Cold Draught 🍺
                </p>
              </div>

              {/* Circular Stamp Badge: FRANKIES AT THE BEACH ★ RAMSGATE (Accents bottom center cleanly without blocking food photos) */}
              <div
                className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 stamp-badge pointer-events-auto"
                title="Frankies At The Beach Ramsgate"
              >
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-dashed border-[#0070E0] p-1 flex items-center justify-center relative shadow-[0_12px_28px_rgba(0,112,224,0.35)]">
                  {/* Outer circular text simulated with SVG */}
                  <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePathTop"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[7.5px] font-extrabold uppercase tracking-[0.14em] fill-[#0070E0]">
                      <textPath href="#circlePathTop" startOffset="0%">
                        FRANKIES AT THE BEACH ★ RAMSGATE ★
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Beach & Fun Icon */}
                  <div className="absolute inset-0 m-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eef7ff] flex items-center justify-center border border-[#0070E0]/25">
                    <Sparkles className="w-3.5 h-3.5 text-[#0070E0] fill-current" />
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
