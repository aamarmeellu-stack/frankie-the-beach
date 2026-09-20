import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  X,
  ChevronDown,
  ExternalLink,
  Utensils,
  Sparkles,
  Award,
} from 'lucide-react';
import { TRIPADVISOR_LINKS, FRANKIE_VIDEOS } from '../data/restaurantData';
import { PWAInstallButton } from './PWAInstallButton';
import { useImages } from '../context/ImageContext';
import { ClientImage } from './ClientImage';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { clientImages } = useImages();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tripAdvisorOpen, setTripAdvisorOpen] = useState(false);
  const [mobileTripAdvisorOpen, setMobileTripAdvisorOpen] = useState(true);
  const tripAdvisorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tripAdvisorRef.current && !tripAdvisorRef.current.contains(event.target as Node)) {
        setTripAdvisorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTripAdvisorOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open so touch/wheel scrolls the menu drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-extrabold uppercase tracking-widest transition-all py-1 relative ${
      isActive
        ? 'text-[#ECD87A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#ECD87A] after:via-[#D1A03F] after:to-[#8C6F2B] after:mt-0.5'
        : 'text-white/95 hover:text-[#ECD87A]'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full py-2.5 px-3 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors ${
      isActive ? 'bg-gradient-to-r from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] text-[#000000] font-black shadow-sm' : 'text-white hover:bg-white/10'
    }`;

  const isTripAdvisorActive = location.pathname.startsWith('/tripadvisor');

  return (
    <header className="sticky top-0 z-50 w-full px-2 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2 sm:pb-3 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto bg-[radial-gradient(ellipse_at_50%_35%,#0084FF_0%,#0070E0_50%,#0048B8_100%)] shadow-[0_14px_36px_rgba(0,112,224,0.45)] border-2 border-amber-300/45 rounded-2xl sm:rounded-3xl relative transition-all">
        <div className="px-3 sm:px-6 lg:px-8 min-h-[84px] sm:min-h-[96px] md:min-h-[104px] py-1.5 sm:py-2 flex items-center justify-between">
          {/* Left Balance Spacer on Mobile (matches width of right hamburger button for optical centering) */}
          <div className="flex md:hidden items-center justify-start w-11 sm:w-12 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Brand Logo - Centered on mobile, aligned to left on desktop */}
          <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start">
            <Link
              to="/"
              className="flex items-center justify-center select-none group shrink-0 py-1 focus:outline-none"
              id="brand-logo"
              aria-label="Frankie's @ The Beach - Home"
            >
              <ClientImage
                slotKey="site:logo"
                src={clientImages.logo || '/logo.webp'}
                fallbackSrc="/logo.webp"
                alt="Frankie's @ The Beach"
                className="h-16 min-[380px]:h-20 min-[480px]:h-22 sm:h-22 md:h-22 lg:h-24 w-auto max-w-[210px] min-[380px]:max-w-[260px] min-[480px]:max-w-[290px] sm:max-w-[290px] md:max-w-[270px] lg:max-w-[310px] object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] group-hover:scale-105 group-hover:drop-shadow-[0_6px_20px_rgba(236,216,122,0.55)] transition-all duration-200 shrink-0"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7" id="desktop-nav">
            <NavLink to="/" end className={navLinkClass} id="nav-home">
              HOME
            </NavLink>
            <NavLink to="/menu" className={navLinkClass} id="nav-menu">
              MENU
            </NavLink>
            <NavLink to="/about" className={navLinkClass} id="nav-about">
              ABOUT US
            </NavLink>
            <NavLink to="/gallery" className={navLinkClass} id="nav-gallery">
              GALLERY
            </NavLink>
            <NavLink to="/reviews" className={navLinkClass} id="nav-reviews">
              REVIEWS
            </NavLink>
            <NavLink to="/charity" className={navLinkClass} id="nav-charity">
              CHARITY
            </NavLink>

            {/* Beach Equipment Hire Anchor */}
            <a
              href="/#beach-hire"
              onClick={(e) => {
                const el = document.getElementById('beach-hire');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[13px] font-extrabold uppercase tracking-widest text-[#ECD87A] hover:text-white transition-colors py-1 flex items-center gap-1 select-none"
              id="nav-beach-hire"
            >
              <span>BEACH HIRE</span>
            </a>

            {/* Videos Anchor */}
            <a
              href="/#frankies-beach-videos-section"
              onClick={(e) => {
                const el = document.getElementById('frankies-beach-videos-section');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('play-all-frankie-videos'));
                }
              }}
              className="text-[13px] font-extrabold uppercase tracking-widest text-[#ECD87A] hover:text-white transition-colors py-1 flex items-center gap-1 select-none"
              id="nav-videos"
            >
              <span>VIDEOS 🎥</span>
            </a>

            {/* TripAdvisor Dropdown with Direct Dedicated Page Links */}
            <div className="relative" ref={tripAdvisorRef}>
              <div className="flex items-center">
                <NavLink
                  to="/tripadvisor"
                  className={
                    `text-[13px] font-extrabold uppercase tracking-widest transition-colors py-1 flex items-center gap-1 select-none ${
                      isTripAdvisorActive
                        ? 'text-[#D1A03F] after:content-[""] after:block after:w-full after:h-0.5 after:bg-[#D1A03F] after:mt-0.5'
                        : 'text-white/90 hover:text-[#D1A03F]'
                    }`
                  }
                  id="nav-tripadvisor-btn"
                >
                  <span>TRIPADVISOR</span>
                </NavLink>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTripAdvisorOpen(!tripAdvisorOpen);
                  }}
                  className="p-1 text-white/80 hover:text-[#D1A03F] transition-colors cursor-pointer"
                  aria-label="Toggle TripAdvisor sub-pages"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      tripAdvisorOpen ? 'rotate-180 text-[#D1A03F]' : 'text-white/70'
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              {tripAdvisorOpen && (
                <div
                  className="absolute top-full right-0 mt-3 w-88 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5 text-left"
                  role="menu"
                  id="tripadvisor-dropdown-menu"
                >
                  {/* Caret arrow */}
                  <div className="absolute -top-1.5 right-8 w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45 z-10" />

                  {/* Dropdown Header */}
                  <div className="px-2 py-1.5 mb-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-800 font-heading bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Dedicated TripAdvisor Pages
                    </span>
                    <Link
                      to="/tripadvisor"
                      onClick={() => setTripAdvisorOpen(false)}
                      className="text-[10px] text-[#0070E0] font-bold hover:underline"
                    >
                      View Both
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {/* Option 1: The Main (Restaurant Review) - Dedicated Page Link */}
                    <Link
                      to="/tripadvisor/restaurant"
                      onClick={() => setTripAdvisorOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-all group border border-gray-100 hover:border-emerald-300"
                      role="menuitem"
                      id="link-tripadvisor-restaurant"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-heading font-extrabold text-[#000000] group-hover:text-emerald-800 transition-colors">
                            The Main: Food Kiosk &amp; Bar Page
                          </h4>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Dedicated Page
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                            UK #1 Quick Bite
                          </span>
                          <span className="text-[10px] font-bold text-gray-700">4.9 ★ (751 Reviews)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-snug">
                          {TRIPADVISOR_LINKS.restaurant.description}
                        </p>
                      </div>
                    </Link>

                    {/* Option 2: The Children (Attractions & Beach Rides) - Dedicated Page Link */}
                    <Link
                      to="/tripadvisor/attractions"
                      onClick={() => setTripAdvisorOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-amber-50 transition-all group border border-gray-100 hover:border-amber-300"
                      role="menuitem"
                      id="link-tripadvisor-attractions"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-xs">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-heading font-extrabold text-[#000000] group-hover:text-amber-800 transition-colors">
                            The Children: Beach Rides &amp; Attractions Page
                          </h4>
                          <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                            Dedicated Page
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                            Beach Rides &amp; Fun
                          </span>
                          <span className="text-[10px] font-bold text-gray-700">4.9 ★ (270 Reviews)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-snug">
                          {TRIPADVISOR_LINKS.attractions.description}
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Dropdown Footer */}
                  <div className="mt-2.5 pt-2 border-t border-gray-100 px-2 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <Link
                      to="/tripadvisor"
                      onClick={() => setTripAdvisorOpen(false)}
                      className="text-[#0070E0] hover:underline font-bold flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>TripAdvisor Accolades Hub</span>
                    </Link>
                    <a
                      href={TRIPADVISOR_LINKS.restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                    >
                      <span>TripAdvisor UK ↗</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/contact" className={navLinkClass} id="nav-contact">
              CONTACT US
            </NavLink>
          </nav>

          {/* Right Action: PWA Install (desktop) & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 w-11 sm:w-12 md:w-auto justify-end">
            <div className="hidden md:block">
              <PWAInstallButton variant="header" />
            </div>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-white hover:text-amber-300 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 focus:outline-none cursor-pointer transition-colors shrink-0 border border-white/20 shadow-xs"
              aria-label="Toggle navigation menu"
              id="btn-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            className="md:hidden bg-[#005FCE] border-t border-white/15 px-4 sm:px-6 py-4 space-y-2 text-center rounded-b-2xl animate-in slide-in-from-top duration-200 shadow-2xl overflow-y-auto overscroll-contain pb-8"
            style={{
              maxHeight: 'calc(100dvh - 6.5rem)',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
            id="mobile-navigation-drawer"
          >
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              HOME
            </NavLink>
            <NavLink
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              MENU
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              GALLERY
            </NavLink>
            <NavLink
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              REVIEWS
            </NavLink>
            <NavLink
              to="/charity"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
              id="mobile-nav-charity"
            >
              <div className="flex items-center justify-between w-full">
                <span>CHARITY</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Community
                </span>
              </div>
            </NavLink>

            <a
              href="/#beach-hire"
              onClick={(e) => {
                setMobileMenuOpen(false);
                const el = document.getElementById('beach-hire');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={mobileLinkClass}
              id="mobile-nav-beach-hire"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[#ECD87A]">BEACH HIRE</span>
                <span className="text-[10px] bg-[#0070E0] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Deckchairs
                </span>
              </div>
            </a>

            <a
              href="/#frankies-beach-videos-section"
              onClick={(e) => {
                setMobileMenuOpen(false);
                const el = document.getElementById('frankies-beach-videos-section');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('play-all-frankie-videos'));
                }
              }}
              className={mobileLinkClass}
              id="mobile-nav-videos"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[#ECD87A]">BEACH VIDEOS 🎥</span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {FRANKIE_VIDEOS.length} Videos
                </span>
              </div>
            </a>

            {/* Dedicated TripAdvisor Section inside Mobile Drawer with Collapse/Expand */}
            <div className="border border-white/15 my-2 text-left bg-black/20 rounded-2xl p-3">
              <button
                type="button"
                onClick={() => setMobileTripAdvisorOpen(!mobileTripAdvisorOpen)}
                className="w-full flex items-center justify-between cursor-pointer focus:outline-none"
                aria-expanded={mobileTripAdvisorOpen}
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D1A03F] font-heading flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D1A03F]" />
                  DEDICATED TRIPADVISOR PAGES
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    to="/tripadvisor"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] text-sky-200 underline font-bold hover:text-white"
                  >
                    View All
                  </Link>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D1A03F] transition-transform duration-200 ${
                      mobileTripAdvisorOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {mobileTripAdvisorOpen && (
                <div className="space-y-2 mt-2.5 pt-2 border-t border-white/10 animate-in fade-in duration-150">
                  {/* 1. Dedicated Restaurant Page */}
                  <Link
                    to="/tripadvisor/restaurant"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 transition-colors group"
                    id="mobile-link-tripadvisor-restaurant"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span className="text-xs font-heading font-extrabold text-white group-hover:text-[#D1A03F]">
                          The Main: Food Kiosk &amp; Bar
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-300 bg-emerald-900/50 px-1.5 py-0.5 rounded">
                        UK #1 Quick Bite
                      </span>
                    </div>
                    <p className="text-[11px] text-white/75 mt-1 pl-6 leading-tight">
                      Dedicated profile with 751 4.9-Star customer reviews, delicious burgers &amp; treats.
                    </p>
                  </Link>

                  {/* 2. Dedicated Beach Rides Page */}
                  <Link
                    to="/tripadvisor/attractions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-xl bg-white/10 hover:bg-amber-500/20 active:bg-amber-500/30 transition-colors group"
                    id="mobile-link-tripadvisor-attractions"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                        <span className="text-xs font-heading font-extrabold text-white group-hover:text-[#D1A03F]">
                          The Children: Beach Rides &amp; Fun
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-amber-300 bg-amber-900/50 px-1.5 py-0.5 rounded">
                        Family Rides
                      </span>
                    </div>
                    <p className="text-[11px] text-white/75 mt-1 pl-6 leading-tight">
                      Dedicated profile with 270 4.9-Star reviews, vintage carousel &amp; trampolines.
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass}
              id="mobile-nav-contact"
            >
              CONTACT US
            </NavLink>
            
            <div className="pt-2.5 border-t border-white/15 space-y-2.5 pb-2">
              <PWAInstallButton variant="banner" onAction={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs -z-10 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};
