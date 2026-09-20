import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ExternalLink, BarChart3, ChevronRight } from 'lucide-react';
import { TRIPADVISOR_LINKS } from '../data/restaurantData';
import { TripAdvisorDetailModal } from './TripAdvisorDetailModal';
import { ClientImage } from './ClientImage';

interface TripAdvisorItemProps {
  title: string;
  badgeText?: string;
  category: string;
  reviewCount: string;
  rating?: string;
  tagline: string;
  url: string;
  dedicatedRoute: string;
  bannerId: string;
  image?: string;
  imageAlt?: string;
  slotKey?: string;
  onViewDetails: () => void;
}

const TripAdvisorLogo: React.FC<{ className?: string }> = ({ className = 'h-7 sm:h-8' }) => (
  <div className="flex items-center gap-2 sm:gap-2.5 select-none shrink-0">
    <svg
      viewBox="0 0 100 65"
      className={`${className} w-auto`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Owl silhouette / ears */}
      <path
        d="M50 20 C42 8, 26 8, 14 15 C8 18.5, 4 24, 4 33 C4 47, 16 58, 30 58 C38 58, 45 53, 50 46 C55 53, 62 58, 70 58 C84 58, 96 47, 96 33 C96 24, 92 18.5, 86 15 C74 8, 58 8, 50 20 Z"
        fill="#000000"
      />
      {/* Outer eye whites */}
      <circle cx="30" cy="36" r="18" fill="#ffffff" />
      <circle cx="70" cy="36" r="18" fill="#ffffff" />
      {/* Eye rims */}
      <circle cx="30" cy="36" r="14.5" fill="#000000" />
      <circle cx="70" cy="36" r="14.5" fill="#000000" />
      {/* Left Eye Green */}
      <circle cx="30" cy="36" r="11.5" fill="#00aa6c" />
      {/* Right Eye Red */}
      <circle cx="70" cy="36" r="11.5" fill="#d9381e" />
      {/* Pupils */}
      <circle cx="30" cy="36" r="4.8" fill="#000000" />
      <circle cx="70" cy="36" r="4.8" fill="#000000" />
      {/* Eye light reflections */}
      <circle cx="32" cy="34" r="1.8" fill="#ffffff" />
      <circle cx="72" cy="34" r="1.8" fill="#ffffff" />
      {/* Center Beak */}
      <polygon points="50,33 46,45 54,45" fill="#D1A03F" stroke="#000000" strokeWidth="0.8" />
    </svg>
    <div className="flex flex-col text-left">
      <div className="flex items-baseline leading-none">
        <span className="font-sans font-black text-lg sm:text-2xl tracking-tight text-[#000000]">
          tripadvisor
        </span>
        <span className="text-[#00aa6c] text-[10px] font-bold ml-0.5 leading-none">®</span>
      </div>
      <span className="text-[8px] sm:text-[9.5px] font-extrabold tracking-[0.22em] text-[#000000] uppercase font-sans mt-0.5">
        UNITED KINGDOM
      </span>
    </div>
  </div>
);

const TripAdvisorSingleBanner: React.FC<TripAdvisorItemProps> = ({
  title,
  badgeText,
  category,
  reviewCount,
  rating = '4.9',
  tagline,
  url,
  dedicatedRoute,
  bannerId,
  image,
  imageAlt,
  slotKey,
  onViewDetails,
}) => {
  return (
    <div
      id={bannerId}
      className="w-full bg-[#fdfdfc] border-y border-gray-200/90 py-3.5 sm:py-4 px-4 sm:px-8 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left Side: TripAdvisor Logo, Photo Thumbnail & Profile Label */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-2.5 sm:gap-4 text-center sm:text-left">
          <TripAdvisorLogo />
          
          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-3.5">
            {image && (
              <Link
                to={dedicatedRoute}
                className="relative shrink-0 overflow-hidden rounded-full w-14 h-14 sm:w-16 sm:h-16 border-2 border-emerald-500 shadow-sm bg-gray-100 group block hover:ring-2 hover:ring-emerald-500 transition-all cursor-pointer"
                title={`View ${title} profile`}
              >
                <ClientImage
                  src={image}
                  slotKey={slotKey}
                  fallbackSrc={image}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </Link>
            )}

            <div className="flex flex-col items-center sm:items-start">
              {badgeText && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full font-heading mb-0.5">
                  {badgeText}
                </span>
              )}
              <span className="text-xs sm:text-sm font-extrabold text-gray-900 font-heading mt-0.5">
                {title}
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Center: "Pure Seaside Joy" Calligraphy */}
        <div className="text-center my-1 md:my-0 px-2">
          <p
            className="text-3xl sm:text-4xl lg:text-5xl text-[#1e293b] select-none tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {tagline}
          </p>
        </div>

        {/* Right Side: Reviews, 5 Rating Bubbles & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0">
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm sm:text-base text-gray-900 tracking-tight">
                {reviewCount}
              </span>
              {/* 5 signature TripAdvisor green bubbles */}
              <div className="flex items-center gap-1" title={`${rating} out of 5 bubbles`}>
                {[1, 2, 3, 4, 5].map((bubble) => (
                  <span
                    key={bubble}
                    className="w-3.5 h-3.5 rounded-full border border-[#00aa6c] bg-[#00aa6c] inline-block shadow-2xs"
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold tracking-wide mt-0.5">
              {rating} Excellent Rating
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <Link
              to={dedicatedRoute}
              className="inline-flex items-center justify-center gap-1.5 bg-[#0066FF] hover:bg-[#0052D9] active:scale-95 text-white font-heading font-extrabold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg shadow-2xs transition-all"
              id={`btn-dedicated-page-${bannerId}`}
            >
              <span>Dedicated Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onViewDetails}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 border border-gray-300 font-heading font-extrabold text-xs uppercase tracking-wider px-3 py-2.5 rounded-lg shadow-2xs transition-all cursor-pointer"
              title="View quick summary modal"
              id={`btn-view-data-${bannerId}`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="hidden sm:inline">Data</span>
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#f26522] hover:bg-[#d9531e] active:scale-95 text-white font-heading font-extrabold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg shadow-md transition-all group cursor-pointer"
              id={`btn-tripadvisor-${bannerId}`}
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white/20 stroke-[2.2]" />
              <span>TripAdvisor UK</span>
              <ExternalLink className="w-3 h-3 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TripAdvisorMainBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      aria-label="TripAdvisor Restaurant Reviews"
      className={`w-full bg-[#f8f8f6] border-t border-b border-gray-300/80 my-0 relative z-20 overflow-hidden ${className}`}
    >
      {/* Main Restaurant & Kiosk Profile - Displayed across all pages */}
      <TripAdvisorSingleBanner
        bannerId="tripadvisor-banner-restaurant"
        title={TRIPADVISOR_LINKS.restaurant.shortTitle}
        badgeText="The Main • Food &amp; Bar"
        category="Ramsgate Beach Food Kiosk &amp; Bar"
        reviewCount="751 Reviews"
        rating="4.9"
        tagline="Pure Excellence"
        url={TRIPADVISOR_LINKS.restaurant.url}
        dedicatedRoute="/tripadvisor/restaurant"
        onViewDetails={() => setModalOpen(true)}
      />

      {/* Full TripAdvisor Data Showcase Modal */}
      <TripAdvisorDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab="restaurant"
      />
    </section>
  );
};

export const TripAdvisorAttractionsBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      aria-label="TripAdvisor Children Attractions Reviews"
      className={`w-full bg-[#f8f8f6] border-t border-b border-gray-300/80 my-8 sm:my-12 relative z-10 overflow-hidden shadow-2xs ${className}`}
    >
      {/* Children: Beach Rides & Attractions Profile - Displayed mid-page between sections */}
      <TripAdvisorSingleBanner
        bannerId="tripadvisor-banner-attractions"
        title={TRIPADVISOR_LINKS.attractions.shortTitle}
        category="Beach Rides, Inflatable Slide & Carousel"
        reviewCount="270 Reviews"
        rating="4.9"
        tagline="Pure Seaside Joy"
        url={TRIPADVISOR_LINKS.attractions.url}
        dedicatedRoute="/tripadvisor/attractions"
        image="/childern_3.webp"
        imageAlt="Children playing on Ramsgate beach rides"
        slotKey="site:childrenTrampolines"
        onViewDetails={() => setModalOpen(true)}
      />

      {/* Full TripAdvisor Data Showcase Modal */}
      <TripAdvisorDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab="attractions"
      />
    </section>
  );
};

// Default export alias for backward compatibility across all pages
export const TripAdvisorBanner: React.FC = () => {
  return <TripAdvisorMainBanner />;
};
