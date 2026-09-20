import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Download,
  Star,
  Sparkles,
  Flame,
  UtensilsCrossed,
  Search,
  Info,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { useImages } from '../context/ImageContext';
import { ClientImage, preloadImages } from '../components/ClientImage';
import { DonutSignboardBanner } from '../components/DonutSignboardBanner';

const ALCOHOL_SUBCATEGORIES = [
  { id: 'all', label: 'All Drinks & Alcohol' },
  { id: 'Beer & Cider on Tap', label: 'Beer & Cider on Tap 🍺' },
  { id: 'Cans & Bottles', label: 'Cans & Bottles 🍾' },
  { id: 'Spirits', label: 'Spirits & Mixers 🥃' },
  { id: 'Cocktails', label: 'Cocktails 🍹' },
  { id: 'Prosecco & Wine', label: 'Prosecco & Wine 🥂' },
];

const DONUT_SUBCATEGORIES = [
  { id: 'all', label: 'All Hot Donuts 🍩' },
  { id: 'Plain with Sugar', label: 'Plain with Sugar (2, 5, 10)' },
  { id: 'Ice Cream Combos', label: 'Ice Cream & Sauces 🍦' },
  { id: 'Topped Donuts', label: '2 Topped Gourmet Donuts (20 Flavours)' },
];

export const MenuPage: React.FC = () => {
  const { menuItems } = useImages();
  const { setIsPdfMenuOpen } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeAlcoholSubCategory, setActiveAlcoholSubCategory] = useState<string>('all');
  const [activeDonutSubCategory, setActiveDonutSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'beef-burger': true,
    'bacon-cheese-burger': true,
    'the-footlong-frankfurter': true,
    'pepperoni-cheese-loaded-fries': true,
    'cheesy-fries': true,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '447554663569';
    const message = encodeURIComponent(
      "Hello Frankie's @ The Beach! 🌊🍔 I have a question about your menu and allergens."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesAlcoholSub =
        activeCategory !== 'alcohol' ||
        activeAlcoholSubCategory === 'all' ||
        item.subCategory === activeAlcoholSubCategory;
      const matchesDonutSub =
        activeCategory !== 'donuts' ||
        activeDonutSubCategory === 'all' ||
        item.subCategory === activeDonutSubCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q));
      const matchesPopular = onlyPopular ? item.popular : true;
      return matchesCategory && matchesAlcoholSub && matchesDonutSub && matchesSearch && matchesPopular;
    });
  }, [menuItems, activeCategory, activeAlcoholSubCategory, activeDonutSubCategory, searchQuery, onlyPopular]);

  // Fast prefetch of visible and upcoming items during idle time
  useEffect(() => {
    const urls = filteredItems.slice(0, 8).map((i) => i.image).filter(Boolean) as string[];
    preloadImages(urls);
  }, [filteredItems]);

  return (
    <div className="flex-1 bg-[#EEEFE9] pb-20">
      
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-8 sm:mb-10">
        <div className="bg-[radial-gradient(ellipse_at_50%_30%,#0086FF_0%,#0070E0_50%,#0045B5_100%)] border-2 border-amber-300/45 shadow-[0_16px_40px_rgba(0,112,224,0.35)] text-white py-12 sm:py-16 px-4 sm:px-8 rounded-3xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-sky-200 mb-3 font-semibold">
              <Link to="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-[#D1A03F]">OUR MENU</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-300 font-heading mb-2">
              <UtensilsCrossed className="w-4 h-4 text-[#D1A03F]" />
              <span>BEACHFRONT FOOD KIOSK &amp; BAR</span>
              <UtensilsCrossed className="w-4 h-4 text-[#D1A03F]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              OUR MENU
            </h1>

            <div className="flex items-center justify-center gap-2 my-3 text-[#D1A03F]">
              <div className="h-0.5 w-6 bg-[#D1A03F]/50 rounded-full" />
              <UtensilsCrossed className="w-4 h-4 text-[#ECD87A]" />
              <div className="h-0.5 w-6 bg-[#D1A03F]/50 rounded-full" />
            </div>

            <p className="text-base sm:text-lg text-sky-100 max-w-xl mx-auto font-medium">
              Freshly prepared, locally sourced, and served right by the sea.
            </p>

            {/* Action Buttons: WhatsApp & Download PDF */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
              <button
                onClick={handleWhatsAppContact}
                id="btn-whatsapp-chat"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>CHAT ON WHATSAPP</span>
              </button>

              <button
                onClick={() => setIsPdfMenuOpen(true)}
                id="btn-download-menu-pdf"
                className="inline-flex items-center gap-2 bg-gradient-to-b from-[#ECD87A] via-[#D1A03F] to-[#8C6F2B] hover:brightness-105 active:scale-95 text-[#000000] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD MENU (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dde0d5] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burgers, hot dogs, crispy French fries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#f8f9f5] border border-[#dde0d5] rounded-xl focus:outline-none focus:border-[#0070E0]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter toggle for popular */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                  onlyPopular
                    ? 'bg-[#0070E0] text-white border-[#0070E0]'
                    : 'bg-[#f8f9f5] text-[#476069] border-[#dde0d5] hover:bg-gray-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyPopular ? 'fill-amber-300 text-amber-300' : ''}`} />
                <span>Popular Picks Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-[#edf0e6]">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id !== 'alcohol') {
                      setActiveAlcoholSubCategory('all');
                    }
                    if (cat.id !== 'donuts') {
                      setActiveDonutSubCategory('all');
                    }
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0070E0] text-white shadow-md scale-102 border border-amber-300/40'
                      : 'bg-[#f8f9f5] text-[#476069] hover:bg-[#edf0e6] border border-[#dde0d5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Subcategory Tabs for Beach Bar / Alcohol */}
          {activeCategory === 'alcohol' && (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-amber-200/60 bg-amber-50/40 px-3 py-2 rounded-xl">
              <span className="text-[11px] font-bold text-amber-900 uppercase shrink-0">
                Filter By:
              </span>
              {ALCOHOL_SUBCATEGORIES.map((sub) => {
                const isSubActive = activeAlcoholSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveAlcoholSubCategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      isSubActive
                        ? 'bg-[#D1A03F] text-black shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-amber-100/60 border border-amber-200/80'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Subcategory Tabs for Hot Donuts */}
          {activeCategory === 'donuts' && (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-sky-200/80 bg-sky-50/60 px-3 py-2 rounded-xl">
              <span className="text-[11px] font-extrabold text-sky-950 uppercase shrink-0">
                Donut Selection:
              </span>
              {DONUT_SUBCATEGORIES.map((sub) => {
                const isSubActive = activeDonutSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveDonutSubCategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      isSubActive
                        ? 'bg-[#0070E0] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-sky-100/70 border border-sky-200/80'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hot Donuts Authentic Seaside Signboard Showcase */}
        {activeCategory === 'donuts' && (
          <DonutSignboardBanner
            activeSubCategory={activeDonutSubCategory}
            onSelectSubCategory={(sub) => setActiveDonutSubCategory(sub)}
            onFilterSearch={(q) => setSearchQuery(q)}
          />
        )}

        {/* Beach Bar Highlight Banner */}
        {activeCategory === 'alcohol' && (
          <div className="mb-6 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-amber-500/10 border border-amber-300/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 text-2xl font-bold">
                🍹
              </div>
              <div>
                <h4 className="font-heading font-black text-sm uppercase text-[#000000] tracking-wide">
                  Frankie's Beach Bar & Licensed Drinks
                </h4>
                <p className="text-xs text-gray-600 mt-0.5 max-w-2xl">
                  Draught beer & crisp ciders on tap, chilled bottled lagers, quality spirits with your choice of mixers, fresh beach cocktails, and fine Prosecco & wine by the glass or bottle.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full shrink-0 border border-amber-300">
              Age 18+ • Challenge 25
            </span>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#526b74]">
          <span>
            Showing <strong className="text-[#000000]">{filteredItems.length}</strong> delicious beach items
          </span>
          {(activeCategory !== 'all' || activeAlcoholSubCategory !== 'all' || searchQuery || onlyPopular) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveAlcoholSubCategory('all');
                setSearchQuery('');
                setOnlyPopular(false);
              }}
              className="text-[#0070E0] font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#dde0d5] my-6">
            <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-heading font-extrabold text-lg text-[#000000] uppercase">
              No menu items match your search
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlyPopular(false);
              }}
              className="mt-4 bg-[#0070E0] hover:bg-[#005FCE] text-white px-5 py-2 rounded-xl text-xs font-heading font-extrabold uppercase shadow-sm transition-colors cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item, index) => {
              const isFav = favorites[item.id] ?? false;
              const isDonut = item.category === 'donuts';

              return (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className={`bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,112,224,0.14)] transition-all flex flex-col justify-between group ${
                    isDonut
                      ? 'border-2 border-[#0070E0]/20 hover:border-[#0070E0]'
                      : 'border border-[#dde0d5] hover:border-[#0070E0]/40'
                  }`}
                >
                  {/* Photo & Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e4e8dd]">
                    <ClientImage
                      src={item.image}
                      slotKey={`menu:${item.id}`}
                      fallbackSrc={item.fallbackImage}
                      alt={item.name}
                      priority={index < 4}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* SubCategory or Alcohol Tag overlay */}
                    {item.subCategory && (
                      <span className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-amber-300 border border-amber-400/40 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow-sm">
                        {item.subCategory}
                      </span>
                    )}

                    {/* Favorite Star Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      aria-label={`Favourite ${item.name}`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'fill-amber-400 text-amber-400' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="mb-1">
                        <h3 className="font-heading font-extrabold text-base text-[#000000] uppercase group-hover:text-[#0070E0] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>

                      {item.servingSize && (
                        <p className="text-[11px] font-bold text-[#8C6F2B] mb-2">
                          {item.servingSize}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-[#526b74] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-4 border-t border-[#edf0e6] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#708993] uppercase">
                        {item.category === 'alcohol' ? (
                          <span className="flex items-center gap-1 text-amber-900 font-bold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            {item.subCategory || 'Beach Bar'}
                          </span>
                        ) : item.category === 'drinks' ? (
                          <span className="flex items-center gap-1 text-[#0070E0] font-bold bg-sky-50 px-2 py-0.5 rounded">
                            <Sparkles className="w-3.5 h-3.5" />
                            568ml Pint
                          </span>
                        ) : item.vegetarian ? (
                          <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            Vegetarian
                          </span>
                        ) : item.spicyLevel ? (
                          <span className="flex items-center gap-1 text-red-500 font-bold">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            Spicy
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#0070E0]">
                            <Sparkles className="w-3.5 h-3.5" />
                            Fresh Daily
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0070E0] bg-[#eaf4ff] px-3 py-1 rounded-full border border-[#0070E0]/20">
                        {item.popular ? '★ Popular Pick' : 'Chilled & Fresh'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dietary and Allergens Notice */}
        <div className="mt-14 p-6 bg-white rounded-2xl border border-[#dde0d5] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-[#526b74]">
          <div className="w-10 h-10 rounded-xl bg-[#0070E0]/10 text-[#0070E0] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-extrabold text-xs text-[#000000] uppercase mb-1">
              Dietary Requirements & Allergen Information
            </h4>
            <p className="leading-relaxed">
              All our beef is seared on dedicated chrome flat-tops. Gluten-free burger buns and vegan cheese alternatives are available upon request. Please inform our team of any food allergies when visiting our counter or when contacting us in advance.
            </p>
          </div>
          <button
            onClick={handleWhatsAppContact}
            className="shrink-0 text-xs font-extrabold text-[#0070E0] hover:underline"
          >
            Ask Chef on WhatsApp →
          </button>
        </div>

      </div>
    </div>
  );
};
