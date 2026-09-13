import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Phone,
  UtensilsCrossed,
  Facebook,
  Trophy,
  Award,
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import {
  TRIPADVISOR_LINKS,
  FRANKIES_FACEBOOK_URL,
  NATIONAL_AWARD_DATA,
  EXTRA_MILE_AWARD_DATA,
} from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white pt-14 pb-8 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start group">
              <div className="flex items-center gap-1.5">
                <span className="font-script text-3xl sm:text-4xl text-white tracking-wide font-bold group-hover:text-[#ECD87A] transition-colors">
                  Frankie's
                </span>
                <UtensilsCrossed className="w-6 h-6 text-[#ECD87A] stroke-[2.2] rotate-12 -ml-1 transition-transform group-hover:rotate-0" />
              </div>
              <span className="text-[10px] font-extrabold tracking-[0.28em] text-[#ECD87A] uppercase -mt-1 font-heading">
                @ THE BEACH
              </span>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-xs">
              Ramsgate's seafront food kiosk and bar for 6oz steak burgers, proper seaside chips, jumbo dogs, and cold drinks.
            </p>

            {/* Social Link - Facebook Only & National Award */}
            <div className="pt-1 space-y-3">
              <a
                href={FRANKIES_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 hover:border-[#D1A03F] hover:bg-[#D1A03F] hover:text-[#000e1f] text-white/90 text-xs font-semibold transition-all shadow-xs"
                title="Follow Frankie's on Facebook"
                id="footer-facebook-btn"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              {/* National Award Seal */}
              <a
                href={NATIONAL_AWARD_DATA.sunArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl bg-white/5 border border-amber-400/30 hover:border-amber-400 hover:bg-white/10 transition-all text-left group"
                id="footer-award-badge"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-heading font-extrabold text-[11px] uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Tripadvisor Best of the Best</span>
                </div>
                <p className="text-[11px] text-white/80 mt-1 leading-snug">
                  Crowned among the UK's best — as featured in <strong className="text-white underline decoration-amber-400 decoration-1">The Sun</strong>.
                </p>
              </a>

              {/* Local Customer Service Award Seal */}
              <div
                className="block p-3 rounded-2xl bg-white/5 border border-sky-400/30 text-left"
                id="footer-extra-mile-badge"
              >
                <div className="flex items-center gap-1.5 text-sky-300 font-heading font-extrabold text-[11px] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{EXTRA_MILE_AWARD_DATA.awardTitle}</span>
                </div>
                <p className="text-[11px] text-white/80 mt-1 leading-snug">
                  {EXTRA_MILE_AWARD_DATA.ceremony} • Setting the gold standard for exceptional customer service.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Pages & Navigation */}
          <div>
            <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 mb-4 font-heading">
              PAGES & EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/75 font-medium">
              <li>
                <Link to="/" className="hover:text-[#D1A03F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D1A03F] transition-colors">
                  Full Seaside Menu (Burgers, Dogs &amp; Chips)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D1A03F] transition-colors">
                  About Us &amp; Our Food Kiosk &amp; Bar
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D1A03F] transition-colors">
                  Beach Gallery & Photos
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#D1A03F] transition-colors">
                  Customer Reviews & Ratings
                </Link>
              </li>
              <li>
                <Link to="/charity" className="hover:text-[#D1A03F] transition-colors flex items-center justify-between gap-1.5" id="footer-link-charity">
                  <span>Charity</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Community</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D1A03F] transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/tripadvisor/restaurant"
                  className="hover:text-[#D1A03F] text-emerald-400 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-tripadvisor-restaurant"
                >
                  <span>TripAdvisor: {TRIPADVISOR_LINKS.restaurant.shortTitle}</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Dedicated</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tripadvisor/attractions"
                  className="hover:text-[#D1A03F] text-amber-300 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-tripadvisor-attractions"
                >
                  <span>TripAdvisor: {TRIPADVISOR_LINKS.attractions.shortTitle}</span>
                  <span className="text-[10px] bg-amber-900/60 text-amber-200 px-1.5 py-0.5 rounded font-bold">Dedicated</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tripadvisor"
                  className="hover:text-[#D1A03F] text-cyan-300 font-medium transition-colors text-xs flex items-center gap-1 mt-0.5"
                  id="footer-tripadvisor-hub"
                >
                  <span>All TripAdvisor Accolades &amp; Badges →</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/admin"
                  className="hover:text-amber-400 text-amber-300/90 font-semibold transition-colors flex items-center justify-between gap-1.5"
                  id="footer-admin-link"
                >
                  <span>Admin &amp; Image Studio</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Upload</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours & Script */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#D1A03F]" />
              <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                OPEN HOURS
              </h4>
            </div>

            <div className="space-y-1.5 text-xs sm:text-[13px] text-white/75">
              <p className="font-semibold text-white/95">Mon - Thu: 9 AM - 5 PM</p>
              <p className="font-semibold text-white/95">Fri - Sun: 10 AM - 6 PM</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                ● Open Today by the Sea
              </span>
            </div>

            {/* Signature "See you at the beach!" cursive in gold */}
            <div className="mt-6 pt-1">
              <p className="font-hand text-2xl sm:text-3xl text-[#D1A03F] font-bold tracking-wide">
                See you at the beach!
              </p>
              <div className="flex items-center gap-2 text-[#D1A03F] mt-1">
                <UtensilsCrossed className="w-4 h-4 text-[#ECD87A]" />
                <div className="h-0.5 w-16 bg-[#D1A03F]/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Column 4: Find Us & Call Us */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <MapPin className="w-4 h-4 text-[#D1A03F] shrink-0" />
                <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                  VISIT US
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed pl-6">
                Kiosk 1<br />
                Marina Esplanade<br />
                Ramsgate CT11 8LS<br />
                United Kingdom
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Phone className="w-4 h-4 text-[#D1A03F] shrink-0" />
                <h4 className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/90 font-heading">
                  CONTACT
                </h4>
              </div>
              <div className="text-xs sm:text-[13px] text-white/85 space-y-1 pl-6">
                <a
                  href="tel:+447554663569"
                  className="block font-medium hover:text-[#D1A03F] transition-colors"
                >
                  +44 7554 663569
                </a>
                <a
                  href="mailto:frankiefernando@msn.com"
                  className="block text-white/70 hover:text-[#D1A03F] transition-colors text-[12px] break-all"
                >
                  frankiefernando@msn.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Branding */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© 2026 Frankie's @ the beach. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-white/50">
            <UtensilsCrossed className="w-4 h-4 text-[#ECD87A]" />
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#ECD87A]">
              Food Kiosk &amp; Bar Ramsgate
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
