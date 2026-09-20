import React, { useState } from 'react';
import { Play, Star, ExternalLink, Utensils, CheckCircle2, Youtube } from 'lucide-react';
import { FOOD_CRITIC_REVIEW } from '../data/restaurantData';

export const FoodCriticReview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section 
      id="food-critic-review-section"
      aria-label="Independent Food Critic Review"
      className="py-16 sm:py-20 bg-white border-b border-[#dde0d5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Label */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            <span>Independent Taste Test &amp; Video Report</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] font-heading tracking-tight leading-tight uppercase">
            Testing the Best Beach Food in the UK
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-[#496068] max-w-2xl mx-auto leading-relaxed">
            Independent food critic <strong className="text-black">{FOOD_CRITIC_REVIEW.criticName}</strong> visited Frankie's at the beach to sample the food, check out the sea views, and see if our Tripadvisor #1 ranking was true.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Video Player / Thumbnail */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 aspect-video group">
              {isPlaying ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/vmb1puvkpv4?autoplay=1&rel=0"
                  title="Trying the BEST Beach Food in the UK? Frankie's Food Review by Anne at the table"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div 
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true); }}
                  aria-label="Play video review by Anne at the table"
                >
                  <img
                    src={FOOD_CRITIC_REVIEW.thumbnailUrl}
                    alt="Video thumbnail: Food review of Frankie's by Anne at the table"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Critic Pill & Title on Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 backdrop-blur-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      Critic Rating: {FOOD_CRITIC_REVIEW.rating}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-md">
                      "{FOOD_CRITIC_REVIEW.title}"
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-links */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-xs text-gray-500 px-1">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Unsponsored &amp; independent food tasting report
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={FOOD_CRITIC_REVIEW.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0070E0] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Critic's Verdict & Sampled Items Breakdown */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Critic Score Card */}
            <div className="p-6 rounded-3xl bg-[#f8f9f5] border border-[#e2e6db] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500 font-heading">
                    Independent Verdict
                  </span>
                  <h4 className="text-lg font-extrabold text-gray-900 font-heading">
                    {FOOD_CRITIC_REVIEW.criticName}
                  </h4>
                </div>

                <div className="px-3.5 py-1.5 rounded-2xl bg-[#0070E0] text-white text-center shadow-sm">
                  <span className="text-xl font-black font-heading leading-none block">8.5</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-sky-200">Out of 10</span>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-[#0070E0] text-gray-800 italic text-sm leading-relaxed shadow-xs">
                "{FOOD_CRITIC_REVIEW.verdict}"
              </blockquote>
            </div>

            {/* Items Sampled */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0070E0] font-heading">
                <Utensils className="w-3.5 h-3.5" />
                <span>Dishes Sampled in the Video Report</span>
              </div>

              <div className="space-y-2.5">
                {FOOD_CRITIC_REVIEW.sampledItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#e4e8dd] shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 tracking-wider">
                        {item.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      "{item.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
