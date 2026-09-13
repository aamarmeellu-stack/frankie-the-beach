/**
 * Unified slot mapping and alias resolver for Frankie's @ The Beach.
 * Bridges differences between menu item IDs, chef's favorite IDs, and site attraction slots
 * so that any updated photo takes effect across the entire website instantly.
 */

export interface UnifiedSlot {
  key: string;
  type: 'menu' | 'site' | 'gallery';
  label: string;
  category?: string;
  location: string;
  aliases: string[];
}

export const UNIFIED_SLOTS: UnifiedSlot[] = [
  // ==========================================
  // 1. CORE MENU DISHES
  // ==========================================
  {
    key: 'beef-burger',
    type: 'menu',
    label: 'Beef Burger (6oz Steak Patty)',
    category: 'burgers',
    location: 'Menu / Home / TripAdvisor / Chef’s Favourites',
    aliases: ['menu:beef-burger', 'beef-burger', 'menu:beach-classic', 'beach-classic', 'the-classic-burger', 'menu:the-classic-burger', 'food1Burger', 'site:food1Burger', 'site:heroBurger'],
  },
  {
    key: 'bacon-cheese-burger',
    type: 'menu',
    label: 'Bacon Cheese Burger (6oz Steak Patty)',
    category: 'burgers',
    location: 'Menu / Home / Chef’s Favourites',
    aliases: ['menu:bacon-cheese-burger', 'bacon-cheese-burger', 'menu:bbq-bacon-stack', 'bbq-bacon-stack', 'food5BaconBurger', 'site:food5BaconBurger'],
  },
  {
    key: 'caribbean-chilli-cheese-burger',
    type: 'menu',
    label: 'Caribbean Chilli Cheese Burger (6oz Steak Patty)',
    category: 'burgers',
    location: 'Menu / Gallery',
    aliases: ['menu:caribbean-chilli-cheese-burger', 'caribbean-chilli-cheese-burger', 'menu:spicy-beach-burger', 'spicy-beach-burger', 'food8BurgerSlushy', 'site:food8BurgerSlushy', 'spicyBurger', 'site:spicyBurger'],
  },
  {
    key: 'double-egg-cheese-burger',
    type: 'menu',
    label: 'Double Egg Cheese Burger (6oz Steak Patty)',
    category: 'burgers',
    location: 'Menu',
    aliases: ['menu:double-egg-cheese-burger', 'double-egg-cheese-burger'],
  },
  {
    key: 'stilton-cheese-bacon-burger',
    type: 'menu',
    label: 'Stilton Cheese Bacon Burger (6oz Steak Patty)',
    category: 'burgers',
    location: 'Menu',
    aliases: ['menu:stilton-cheese-bacon-burger', 'stilton-cheese-bacon-burger'],
  },
  {
    key: 'supreme-veggie-burger',
    type: 'menu',
    label: 'Supreme Veggie Burger (Vegetarian)',
    category: 'burgers',
    location: 'Menu',
    aliases: ['menu:supreme-veggie-burger', 'supreme-veggie-burger'],
  },
  {
    key: 'chicken-cheese-burger',
    type: 'menu',
    label: 'Chicken Burger (Buttermilk Chicken Fillet)',
    category: 'chicken-burgers',
    location: 'Menu',
    aliases: ['menu:chicken-cheese-burger', 'chicken-cheese-burger', 'menu:chicken-burger', 'chicken-burger'],
  },
  {
    key: 'caribbean-chicken-and-cheese-burger',
    type: 'menu',
    label: 'Caribbean Chicken and Cheese (Caribbean Pepper Sauce)',
    category: 'chicken-burgers',
    location: 'Menu',
    aliases: ['menu:caribbean-chicken-and-cheese-burger', 'caribbean-chicken-and-cheese-burger'],
  },
  {
    key: 'chicken-jack-burger',
    type: 'menu',
    label: "Chicken Cheese Jack Burger (Jack Daniel's Sauce)",
    category: 'chicken-burgers',
    location: 'Menu',
    aliases: ['menu:chicken-jack-burger', 'chicken-jack-burger', 'menu:chicken-cheese-jack-burger', 'chicken-cheese-jack-burger'],
  },
  {
    key: 'venison-burger',
    type: 'menu',
    label: 'Venison Burger (Locally Sourced)',
    category: 'chicken-burgers',
    location: 'Menu',
    aliases: ['menu:venison-burger', 'venison-burger'],
  },
  {
    key: 'bacon-roll-3-rashers',
    type: 'menu',
    label: 'Bacon Roll 3 Rashers (Danish Bacon)',
    category: 'breakfast-rolls',
    location: 'Menu (Breakfast Rolls Tab)',
    aliases: ['menu:bacon-roll-3-rashers', 'bacon-roll-3-rashers', 'bacon-roll', 'baconRoll3Rashers'],
  },
  {
    key: 'bacon-roll-topped-with-melted-cheese',
    type: 'menu',
    label: 'Bacon Roll topped with Melted Cheese',
    category: 'breakfast-rolls',
    location: 'Menu (Breakfast Rolls Tab)',
    aliases: ['menu:bacon-roll-topped-with-melted-cheese', 'bacon-roll-topped-with-melted-cheese', 'bacon-roll-melted-cheese', 'baconRollMeltedCheese'],
  },
  {
    key: '3-rashers-of-bacon-with-2-eggs-in-roll',
    type: 'menu',
    label: '3 Rashers of Bacon with 2 Eggs in Roll',
    category: 'breakfast-rolls',
    location: 'Menu (Breakfast Rolls Tab)',
    aliases: ['menu:3-rashers-of-bacon-with-2-eggs-in-roll', '3-rashers-of-bacon-with-2-eggs-in-roll', 'bacon-roll-2-eggs', 'baconRoll2Eggs'],
  },
  {
    key: 'bacon-and-tomato-roll',
    type: 'menu',
    label: 'Bacon and Tomato Roll',
    category: 'breakfast-rolls',
    location: 'Menu (Breakfast Rolls Tab)',
    aliases: ['menu:bacon-and-tomato-roll', 'bacon-and-tomato-roll', 'baconTomatoRoll'],
  },
  {
    key: 'bacon-lettuce-and-tomato-roll',
    type: 'menu',
    label: 'Bacon, Lettuce and Tomato Roll (BLT)',
    category: 'breakfast-rolls',
    location: 'Menu (Breakfast Rolls Tab)',
    aliases: ['menu:bacon-lettuce-and-tomato-roll', 'bacon-lettuce-and-tomato-roll', 'blt-roll', 'baconLettuceTomatoRoll'],
  },
  {
    key: 'large-fries',
    type: 'menu',
    label: 'Large Fries (Skin-on)',
    category: 'fries',
    location: 'Menu (Fries Tab)',
    aliases: ['menu:large-fries', 'large-fries', 'fries'],
  },
  {
    key: 'large-cheesy-fries',
    type: 'menu',
    label: 'Large Cheesy Fries (Mature Cheddar)',
    category: 'fries',
    location: 'Menu (Fries Tab)',
    aliases: ['menu:large-cheesy-fries', 'large-cheesy-fries', 'menu:cheesy-fries', 'cheesy-fries', 'menu:cheesy-bacon-fries', 'cheesy-bacon-fries'],
  },
  {
    key: 'bacon-cheese-loaded-fries',
    type: 'menu',
    label: 'Bacon and Cheese Loaded Fries',
    category: 'loaded-fries',
    location: 'Menu (Loaded Fries Tab)',
    aliases: ['menu:bacon-cheese-loaded-fries', 'bacon-cheese-loaded-fries'],
  },
  {
    key: 'pepperoni-cheese-loaded-fries',
    type: 'menu',
    label: 'Pepperoni Loaded Fries with Melted Cheese',
    category: 'loaded-fries',
    location: 'Menu / Home / TripAdvisor / Chef’s Favourites',
    aliases: ['menu:pepperoni-cheese-loaded-fries', 'pepperoni-cheese-loaded-fries', 'menu:pepperoni-melted-cheddar-fries', 'pepperoni-melted-cheddar-fries', 'menu:pepperoni-cheddar-fries', 'pepperoni-cheddar-fries', 'loaded-fries', 'food2LoadedChips', 'site:food2LoadedChips', 'site:pepperoniFries', 'pepperoniFries'],
  },
  {
    key: 'southern-fried-chicken-cheese-loaded-fries',
    type: 'menu',
    label: 'Southern Fried Chicken Loaded Fries',
    category: 'loaded-fries',
    location: 'Menu (Loaded Fries Tab)',
    aliases: ['menu:southern-fried-chicken-cheese-loaded-fries', 'southern-fried-chicken-cheese-loaded-fries', 'menu:fully-loaded-chicken-fries', 'fully-loaded-chicken-fries', 'food6ChickenChips', 'site:food6ChickenChips'],
  },
  {
    key: 'fish-fingers-cheese-loaded-fries',
    type: 'menu',
    label: 'Fish Finger and Cheese Loaded Fries',
    category: 'loaded-fries',
    location: 'Menu (Loaded Fries Tab)',
    aliases: ['menu:fish-fingers-cheese-loaded-fries', 'fish-fingers-cheese-loaded-fries'],
  },
  {
    key: 'the-footlong-frankfurter',
    type: 'menu',
    label: 'The Footlong Frankfurter (Brioche Bun)',
    category: 'hot-dogs',
    location: 'Menu / TripAdvisor / Chef’s Favourites',
    aliases: ['menu:the-footlong-frankfurter', 'the-footlong-frankfurter', 'chilliCheeseDog', 'site:chilliCheeseDog', 'menu:chilli-cheese-dog', 'chilli-cheese-dog'],
  },
  {
    key: 'the-footlong-bratwurst',
    type: 'menu',
    label: 'The Footlong Bratwurst (German Bratwurst)',
    category: 'hot-dogs',
    location: 'Menu',
    aliases: ['menu:the-footlong-bratwurst', 'the-footlong-bratwurst', 'frankiesSausageTray', 'site:frankiesSausageTray'],
  },
  {
    key: 'the-lincolnshire-long-dog',
    type: 'menu',
    label: 'The Lincolnshire Long Dog (British Banger)',
    category: 'hot-dogs',
    location: 'Menu',
    aliases: ['menu:the-lincolnshire-long-dog', 'the-lincolnshire-long-dog', 'boardwalkDog', 'site:boardwalkDog', 'food7BurgerDogCombo', 'site:food7BurgerDogCombo'],
  },
  {
    key: 'the-chilli-beef-dog',
    type: 'menu',
    label: 'The Chilli Beef Dog (Spicy Kick)',
    category: 'hot-dogs',
    location: 'Menu',
    aliases: ['menu:the-chilli-beef-dog', 'the-chilli-beef-dog'],
  },

  // ==========================================
  // 2. HOMEPAGE & KEY WEBSITE SECTIONS
  // ==========================================
  {
    key: 'logo',
    type: 'site',
    label: 'Brand Logo & App Icon (Browser Tab Favicon, App Download, Header)',
    location: 'Browser Tab Favicon, App Download Modals/Banners, Header & All Brand Badges',
    aliases: ['logo', 'site:logo', 'favicon', 'site:favicon', 'appIcon', 'site:appIcon', 'pwaIcon', 'site:pwaIcon', 'brandLogo', 'site:brandLogo'],
  },
  {
    key: 'heroBg',
    type: 'site',
    label: 'Homepage Hero Ocean Beach Background',
    location: 'Homepage Top Hero Full Width Background',
    aliases: ['heroBg', 'site:heroBg', 'heroBeachBg', 'site:heroBeachBg'],
  },
  {
    key: 'heroVideo',
    type: 'site',
    label: 'Homepage Hero Video Background (MP4 / WebM)',
    location: 'Homepage Top Hero Video Background',
    aliases: ['heroVideo', 'site:heroVideo', 'videoBg', 'site:videoBg'],
  },
  {
    key: 'cateringVideo',
    type: 'site',
    label: 'Beach Catering & Events Video (MP4 / WebM)',
    location: 'Homepage Catering & Private Hire Showcase Section',
    aliases: ['cateringVideo', 'site:cateringVideo'],
  },
  {
    key: 'heroBurger',
    type: 'site',
    label: 'Homepage Hero Main Cheeseburger Polaroid',
    location: 'Homepage Top Hero Center Polaroid',
    aliases: ['heroBurger', 'site:heroBurger'],
  },
  {
    key: 'heroLoadedChips',
    type: 'site',
    label: 'Homepage Hero Loaded Chips Polaroid',
    location: 'Homepage Top Hero Bottom-Right Polaroid',
    aliases: ['heroLoadedChips', 'site:heroLoadedChips', 'heroDrink', 'site:heroDrink'],
  },
  {
    key: 'kiosk',
    type: 'site',
    label: "Frankie's Beachfront Kiosk & Terrace",
    location: 'Homepage Hero Top-Right Polaroid / About Page Grounds',
    aliases: ['kiosk', 'site:kiosk', 'kioskExterior', 'site:kioskExterior', 'beachPatio', 'site:beachPatio'],
  },
  {
    key: 'barSelfie',
    type: 'site',
    label: 'Frankie Fernando & Beach Bar Crew',
    location: 'About Page Founder Story / Charity Page',
    aliases: ['barSelfie', 'site:barSelfie', 'genuineBarSelfie', 'site:genuineBarSelfie', 'barTeam', 'site:barTeam'],
  },
  {
    key: 'pepperoniFries',
    type: 'site',
    label: 'Pepperoni & Dirty Fries Promo Card',
    location: 'Homepage Category Cards (Loaded Fries & Chips)',
    aliases: ['pepperoniFries', 'site:pepperoniFries'],
  },
  {
    key: 'food7BurgerDogCombo',
    type: 'site',
    label: 'Jumbo Seaside Dogs Feature Card',
    location: 'Homepage Category Cards (Hot Dogs & Grill)',
    aliases: ['food7BurgerDogCombo', 'site:food7BurgerDogCombo'],
  },
  {
    key: 'childrenCarousel',
    type: 'site',
    label: 'Seaside Vintage 1950s Carousel',
    location: 'Homepage Banner / TripAdvisor Rides / About Page / Charity Page',
    aliases: ['childrenCarousel', 'site:childrenCarousel', 'vintageCarousel', 'site:vintageCarousel'],
  },
  {
    key: 'childrenSlide',
    type: 'site',
    label: 'Giant 3-Lane Beach Inflatable Slide',
    location: 'About Page Funfair / TripAdvisor Rides / Charity Page',
    aliases: ['childrenSlide', 'site:childrenSlide', 'childrenPlayArea', 'site:childrenPlayArea', 'inflatableSlide', 'site:inflatableSlide'],
  },
  {
    key: 'childrenTrampolines',
    type: 'site',
    label: 'Beachfront Bungee Trampolines Arena',
    location: 'About Page Funfair / TripAdvisor Rides / Charity Page',
    aliases: ['childrenTrampolines', 'site:childrenTrampolines', 'beachTrampolines', 'site:beachTrampolines'],
  },
  {
    key: 'childrenKiddiesCorner',
    type: 'site',
    label: 'Kiddies Corner & Family Carousel Walk',
    location: 'About Page Funfair / Charity Page',
    aliases: ['childrenKiddiesCorner', 'site:childrenKiddiesCorner', 'kiddiesCorner', 'site:kiddiesCorner'],
  },
  {
    key: 'childrenScooter',
    type: 'site',
    label: 'Beach Electric Scooters Track',
    location: 'TripAdvisor Rides Section',
    aliases: ['childrenScooter', 'site:childrenScooter'],
  },

  // ==========================================
  // 3. ALL OFFICIAL 24 GALLERY PHOTOS
  // ==========================================
  {
    key: 'g-terrace',
    type: 'gallery',
    label: "Frankie's Beach Terrace & Seaside View",
    category: 'kiosk-team',
    location: 'Customer Gallery (Beach Kiosk & Team)',
    aliases: ['gallery:g-terrace', 'g-terrace'],
  },
  {
    key: 'g-team',
    type: 'gallery',
    label: "Frankie's Beach Bar Team & Hospitality",
    category: 'kiosk-team',
    location: 'Customer Gallery (Beach Kiosk & Team)',
    aliases: ['gallery:g-team', 'g-team'],
  },
  {
    key: 'g-burger-beef',
    type: 'gallery',
    label: '6oz Beef Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-beef', 'g-burger-beef', 'gallery:g-burger-1', 'g-burger-1'],
  },
  {
    key: 'g-burger-bacon-cheese',
    type: 'gallery',
    label: 'Bacon Cheese 6oz Steak Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-bacon-cheese', 'g-burger-bacon-cheese', 'gallery:g-burger-5', 'g-burger-5'],
  },
  {
    key: 'g-burger-chilli-cheese',
    type: 'gallery',
    label: 'Caribbean Chilli Cheese Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-chilli-cheese', 'g-burger-chilli-cheese', 'gallery:g-burger-8', 'g-burger-8'],
  },
  {
    key: 'g-burger-double-egg',
    type: 'gallery',
    label: 'Double Egg Cheese Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-double-egg', 'g-burger-double-egg'],
  },
  {
    key: 'g-burger-stilton',
    type: 'gallery',
    label: 'Stilton Cheese Bacon Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-stilton', 'g-burger-stilton'],
  },
  {
    key: 'g-burger-veggie',
    type: 'gallery',
    label: 'Supreme Veggie Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-veggie', 'g-burger-veggie', 'gallery:supreme-veggie', 'supreme-veggie'],
  },
  {
    key: 'g-burger-chicken-cheese',
    type: 'gallery',
    label: 'Chicken Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-chicken-cheese', 'g-burger-chicken-cheese', 'gallery:chicken-burger', 'chicken-burger'],
  },
  {
    key: 'g-burger-chicken-jack',
    type: 'gallery',
    label: 'Chicken Cheese Jack Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-chicken-jack', 'g-burger-chicken-jack', 'gallery:chicken-cheese-jack-burger', 'chicken-cheese-jack-burger'],
  },
  {
    key: 'g-burger-venison',
    type: 'gallery',
    label: 'Venison Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-venison', 'g-burger-venison'],
  },
  {
    key: 'g-dog-frankfurter',
    type: 'gallery',
    label: 'The Footlong Frankfurter',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-dog-frankfurter', 'g-dog-frankfurter', 'gallery:g-dog-combo', 'g-dog-combo'],
  },
  {
    key: 'g-dog-lincolnshire',
    type: 'gallery',
    label: 'The Lincolnshire Long Dog',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-dog-lincolnshire', 'g-dog-lincolnshire', 'gallery:g-dog-chilli', 'g-dog-chilli'],
  },
  {
    key: 'g-cheesy-fries',
    type: 'gallery',
    label: 'Cheesy Fries (Mature Cheddar)',
    category: 'loaded-fries',
    location: 'Customer Gallery (Loaded Fries & Sides)',
    aliases: ['gallery:g-cheesy-fries', 'g-cheesy-fries'],
  },
  {
    key: 'g-pepperoni-fries',
    type: 'gallery',
    label: 'Pepperoni & Melted Cheddar Dirty Fries',
    category: 'loaded-fries',
    location: 'Customer Gallery (Loaded Fries & Sides)',
    aliases: ['gallery:g-pepperoni-fries', 'g-pepperoni-fries'],
  },
  {
    key: 'g-chicken-fries',
    type: 'gallery',
    label: 'Southern Fried Chicken & Cheese Loaded Fries',
    category: 'loaded-fries',
    location: 'Customer Gallery (Loaded Fries & Sides)',
    aliases: ['gallery:g-chicken-fries', 'g-chicken-fries'],
  },
  {
    key: 'g-fish-fingers-fries',
    type: 'gallery',
    label: 'Fish Fingers & Cheese Loaded Fries',
    category: 'loaded-fries',
    location: 'Customer Gallery (Loaded Fries & Sides)',
    aliases: ['gallery:g-fish-fingers-fries', 'g-fish-fingers-fries'],
  },
  {
    key: 'g-childern-1',
    type: 'gallery',
    label: 'Giant 3-Lane Inflatable Beach Slide',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-1', 'g-childern-1'],
  },
  {
    key: 'g-childern-2',
    type: 'gallery',
    label: 'Kiddies Corner Carousel & Family Beach Fun',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-2', 'g-childern-2'],
  },
  {
    key: 'g-childern-3',
    type: 'gallery',
    label: 'Beachfront Trampolines Arena on Ramsgate Sands',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-3', 'g-childern-3'],
  },
  {
    key: 'g-childern-4',
    type: 'gallery',
    label: 'Vintage Red & Yellow Carousel on Ramsgate Sands',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-4', 'g-childern-4'],
  },
];

/**
 * Returns all potential keys (with and without prefixes) that should be updated
 * when a user assigns an image to this slot.
 */
export function getAllAliasesForSlot(targetKey: string): string[] {
  if (!targetKey) return [];
  const clean = targetKey.replace(/^(menu:|site:|gallery:)/, '');
  const matched = UNIFIED_SLOTS.find(
    (s) => s.key === clean || s.aliases.includes(targetKey) || s.aliases.includes(clean)
  );

  if (matched) {
    const set = new Set<string>([...matched.aliases, targetKey, clean]);
    if (matched.type === 'menu') {
      set.add(`menu:${matched.key}`);
      set.add(matched.key);
    } else if (matched.type === 'gallery') {
      set.add(`gallery:${matched.key}`);
      set.add(matched.key);
    } else {
      set.add(`site:${matched.key}`);
      set.add(matched.key);
    }
    return Array.from(set);
  }

  // Fallback for custom items
  return [
    targetKey,
    clean,
    `menu:${clean}`,
    `site:${clean}`,
    `gallery:${clean}`,
  ];
}

// High-performance static alias lookup map (O(1) lookup instead of O(N) array search)
const ALIAS_LOOKUP_MAP = new Map<string, string[]>();
for (const s of UNIFIED_SLOTS) {
  ALIAS_LOOKUP_MAP.set(s.key, s.aliases);
  ALIAS_LOOKUP_MAP.set(`menu:${s.key}`, s.aliases);
  ALIAS_LOOKUP_MAP.set(`site:${s.key}`, s.aliases);
  ALIAS_LOOKUP_MAP.set(`gallery:${s.key}`, s.aliases);
  for (const a of s.aliases) {
    ALIAS_LOOKUP_MAP.set(a, s.aliases);
    if (!a.includes(':')) {
      ALIAS_LOOKUP_MAP.set(`menu:${a}`, s.aliases);
      ALIAS_LOOKUP_MAP.set(`site:${a}`, s.aliases);
      ALIAS_LOOKUP_MAP.set(`gallery:${a}`, s.aliases);
    }
  }
}

/**
 * Resolves an override from the slotOverrides object using all known alias patterns.
 */
export function resolveImageOverride(
  slotKey: string | undefined,
  overrides: Record<string, string>
): string | undefined {
  if (!slotKey || !overrides) return undefined;

  // Direct check
  if (overrides[slotKey]) return overrides[slotKey];

  const clean = slotKey.replace(/^(menu:|site:|gallery:)/, '');
  if (overrides[clean]) return overrides[clean];
  if (overrides[`menu:${clean}`]) return overrides[`menu:${clean}`];
  if (overrides[`site:${clean}`]) return overrides[`site:${clean}`];
  if (overrides[`gallery:${clean}`]) return overrides[`gallery:${clean}`];

  // O(1) Map lookup
  const aliases = ALIAS_LOOKUP_MAP.get(slotKey) || ALIAS_LOOKUP_MAP.get(clean);
  if (aliases) {
    for (let i = 0; i < aliases.length; i++) {
      const alias = aliases[i];
      if (overrides[alias]) return overrides[alias];
    }
  }

  return undefined;
}
