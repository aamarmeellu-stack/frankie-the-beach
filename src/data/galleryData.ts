import { GalleryItem } from '../types';
import { CLIENT_IMAGES } from './restaurantData';

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  // 1. Kiosk & Team
  {
    id: 'g-team',
    src: CLIENT_IMAGES.barSelfie,
    fallbackSrc: CLIENT_IMAGES.barSelfie,
    title: "Frankie's Beach Bar Team & Warm Hospitality",
    category: 'kiosk-team',
    desc: "Authentic smiles, cold drinks, iced slushies and welcoming coastal service inside Frankie's bar with Maggie, Frankie and the crew.",
  },
  {
    id: 'g-terrace',
    src: CLIENT_IMAGES.kioskExterior,
    fallbackSrc: CLIENT_IMAGES.kioskExterior,
    title: "Frankie's Beachfront Grounds & Ramsgate Carousel",
    category: 'kiosk-team',
    desc: "Outdoor beach dining area, seaside seating, Ramsgate sand, and the family fun carousel right beside Frankie's.",
  },

  // 2. Burgers & Hot Dogs
  {
    id: 'g-burger-1',
    src: CLIENT_IMAGES.food1Burger,
    fallbackSrc: CLIENT_IMAGES.food1Burger,
    title: 'Gourmet 6oz Beef Steak Burger',
    category: 'burgers-dogs',
    desc: 'A classic juicy 6oz steak patty cooked to perfection on a toasted brioche bun.',
  },
  {
    id: 'g-burger-5',
    src: CLIENT_IMAGES.food5BaconBurger,
    fallbackSrc: CLIENT_IMAGES.food5BaconBurger,
    title: 'Bacon Cheese 6oz Steak Burger',
    category: 'burgers-dogs',
    desc: 'A juicy 6oz steak patty loaded with mature cheddar and thick danish bacon.',
  },
  {
    id: 'g-burger-8',
    src: CLIENT_IMAGES.food8BurgerSlushy,
    fallbackSrc: CLIENT_IMAGES.food8BurgerSlushy,
    title: 'Caribbean Chilli Cheese Burger & Slushy',
    category: 'burgers-dogs',
    desc: 'A juicy 6oz steak patty seasoned with specialty bajan sauce and mature cheese, full of flavour.',
  },
  {
    id: 'g-bacon-sandwich',
    src: CLIENT_IMAGES.baconSandwichHighRes,
    fallbackSrc: CLIENT_IMAGES.baconSandwichHighRes,
    title: 'Sizzling Beach Bacon Roll',
    category: 'burgers-dogs',
    desc: 'Thick-cut grilled smoked bacon served in a warm toasted white roll right on Ramsgate sands.',
  },
  {
    id: 'g-dog-chilli',
    src: CLIENT_IMAGES.chilliCheeseDog,
    fallbackSrc: CLIENT_IMAGES.chilliCheeseDog,
    title: 'The Chilli Beef Dog',
    category: 'burgers-dogs',
    desc: 'Packed full of flavours this slightly spicy dog will get your tastebuds tingling, served in a soft brioche bun.',
  },
  {
    id: 'g-dog-combo',
    src: CLIENT_IMAGES.food7BurgerDogCombo,
    fallbackSrc: CLIENT_IMAGES.food7BurgerDogCombo,
    title: 'The Footlong Frankfurter & Coastal Treats',
    category: 'burgers-dogs',
    desc: 'A delicious classic Frankfurter hotdog with a smoky flavour served in a soft brioche bun by the beach.',
  },
  {
    id: 'g-bbq-wings',
    src: CLIENT_IMAGES.hotWings,
    fallbackSrc: CLIENT_IMAGES.hotWings,
    title: 'Crispy BBQ Glazed Wings',
    category: 'burgers-dogs',
    desc: 'Succulent coated chicken wings tossed in rich, smoky barbecue sauce in a takeaway carton.',
  },

  // 3. Gourmet Crispy French Fries
  {
    id: 'g-pepperoni-fries',
    src: CLIENT_IMAGES.food2LoadedChips,
    fallbackSrc: CLIENT_IMAGES.food2LoadedChips,
    title: 'Pepperoni & Cheese Loaded Fries',
    category: 'loaded-fries',
    desc: 'Pepperoni and our mature cheddars torched to perfection over our fries.',
  },
  {
    id: 'g-cheesy-mayo-chips',
    src: CLIENT_IMAGES.food4ChipsDuo,
    fallbackSrc: CLIENT_IMAGES.food4ChipsDuo,
    title: 'Bacon & Cheese Loaded Fries',
    category: 'loaded-fries',
    desc: 'Thick Danish cut bacon and mature cheddars all torched over our delicious fries.',
  },
  {
    id: 'g-chicken-fries',
    src: CLIENT_IMAGES.food6ChickenChips,
    fallbackSrc: CLIENT_IMAGES.food6ChickenChips,
    title: 'Southern Fried Chicken & Cheese Loaded Fries',
    category: 'loaded-fries',
    desc: 'Southern fried chicken and our mature cheddars torched to perfection over our fries.',
  },
  {
    id: 'g-salted-fries',
    src: CLIENT_IMAGES.perfectChips,
    fallbackSrc: CLIENT_IMAGES.perfectChips,
    title: 'Classic Salted Golden Fries',
    category: 'loaded-fries',
    desc: 'Traditional golden seaside chips, crispy on the outside and piping hot on the inside.',
  },
  {
    id: 'g-perfect-chips',
    src: CLIENT_IMAGES.perfectlyCookedChips,
    fallbackSrc: CLIENT_IMAGES.perfectlyCookedChips,
    title: 'Perfect Seaside Cooked Chips',
    category: 'loaded-fries',
    desc: 'Freshly fried chips served hot in a takeaway box with a wooden fork.',
  },

  // 4. Ice Creams & Sweets
  {
    id: 'g-sprinkle-cone',
    src: CLIENT_IMAGES.iceCreamCone,
    fallbackSrc: CLIENT_IMAGES.iceCreamCone,
    title: 'Rainbow Sprinkle Waffle Cone',
    category: 'treats',
    desc: 'Creamy soft-serve vanilla ice cream piled high and coated in rainbow sprinkles by the sea.',
  },
  {
    id: 'g-cold-icecream',
    src: CLIENT_IMAGES.coldIceCream,
    fallbackSrc: CLIENT_IMAGES.coldIceCream,
    title: 'Classic Coastal Vanilla Soft-Serve',
    category: 'treats',
    desc: 'Smooth and creamy vanilla soft-serve served in a crisp artisan waffle cone right on Ramsgate sands.',
  },

  // 5. Beach Rides & Family Fun
  {
    id: 'g-childern-1',
    src: CLIENT_IMAGES.childrenSlide,
    fallbackSrc: CLIENT_IMAGES.childrenSlide,
    title: 'Giant 3-Lane Inflatable Beach Slide',
    category: 'family',
    desc: 'Vibrant green, yellow, and blue inflatable climbing slide towering right on the Ramsgate beach sand.',
  },
  {
    id: 'g-childern-2',
    src: CLIENT_IMAGES.childrenKiddiesCorner,
    fallbackSrc: CLIENT_IMAGES.childrenKiddiesCorner,
    title: 'Kiddies Corner Carousel & Family Beach Fun',
    category: 'family',
    desc: 'Families enjoying the seaside carousel and amusements right beside Frankie’s beach dining tables.',
  },
  {
    id: 'g-childern-3',
    src: CLIENT_IMAGES.childrenTrampolines,
    fallbackSrc: CLIENT_IMAGES.childrenTrampolines,
    title: 'Beachfront Trampolines Arena on Ramsgate Sands',
    category: 'family',
    desc: 'Multi-bed trampoline jumping arena with striped valance skirting, safety nets, and ocean breezes.',
  },
  {
    id: 'g-childern-4',
    src: CLIENT_IMAGES.childrenCarousel,
    fallbackSrc: CLIENT_IMAGES.childrenCarousel,
    title: 'Vintage Red & Yellow Carousel on Ramsgate Sands',
    category: 'family',
    desc: 'Traditional scalloped merry-go-round with white picket fencing right beside the calm blue sea.',
  },
];
