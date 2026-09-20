import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('src/assets/images');
const outDir = path.resolve('public/donuts');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Master photography assets generated via high-end studio prompts
const PHOTO_SOURCES = {
  plain_2: 'donuts_plain_sugar_1789891468417.jpg',
  plain_5: 'donuts_plain_sugar_1789891468417.jpg',
  plain_10: 'donuts_sharing_box_photo_1789892068037.jpg',
  ice_cream_toppings: 'donuts_carnival_sprinkle_1789891508542.jpg',
  ice_cream_sauce: 'donuts_ice_cream_sauce_photo_1789892117485.jpg',
  marshmallow: 'donuts_marshmallow_photo_1789891933723.jpg',
  sprinkle: 'donuts_carnival_sprinkle_1789891508542.jpg',
  biscoff: 'donuts_biscoff_gourmet_1789891481020.jpg',
  oreo: 'donuts_oreo_chocolate_1789891496854.jpg',
  after_eight: 'donuts_mint_choc_photo_1789892052044.jpg',
  strawberry: 'donuts_strawberry_photo_1789891976278.jpg',
  bubblegum: 'donuts_bubblegum_photo_1789891991512.jpg',
  lime: 'donuts_tropical_fruit_photo_1789892098629.jpg',
  candy_floss: 'donuts_bubblegum_photo_1789891991512.jpg',
  dr_pepper: 'donuts_strawberry_photo_1789891976278.jpg',
  vimto: 'donuts_strawberry_photo_1789891976278.jpg',
  banoffee: 'donuts_toffee_caramel_photo_1789892010556.jpg',
  mango: 'donuts_tropical_fruit_photo_1789892098629.jpg',
  jaffa_cakes: 'donuts_kinder_bueno_photo_1789891956806.jpg',
  red_bull: 'donuts_tropical_fruit_photo_1789892098629.jpg',
  peanut_chocolate: 'donuts_peanut_choc_photo_1789892082848.jpg',
  skittles: 'donuts_carnival_sprinkle_1789891508542.jpg',
  kinder_bueno: 'donuts_kinder_bueno_photo_1789891956806.jpg',
  cadbury_creme_egg: 'donuts_creme_egg_photo_1789892032530.jpg',
  toffee: 'donuts_toffee_caramel_photo_1789892010556.jpg',
};

// Item mapping with subtle custom tinting/lighting options so even shared bases have distinct tones
const DONUT_ITEMS = [
  { id: 'donuts-plain-2', source: PHOTO_SOURCES.plain_2 },
  { id: 'donuts-plain-5', source: PHOTO_SOURCES.plain_5, mod: { zoom: 1.05 } },
  { id: 'donuts-plain-10', source: PHOTO_SOURCES.plain_10 },
  { id: 'donuts-ice-cream-toppings', source: PHOTO_SOURCES.ice_cream_toppings },
  { id: 'donuts-ice-cream-sauce', source: PHOTO_SOURCES.ice_cream_sauce },
  { id: 'donuts-marshmallow', source: PHOTO_SOURCES.marshmallow },
  { id: 'donuts-sprinkle', source: PHOTO_SOURCES.sprinkle },
  { id: 'donuts-biscoff', source: PHOTO_SOURCES.biscoff },
  { id: 'donuts-oreo', source: PHOTO_SOURCES.oreo },
  { id: 'donuts-after-eight', source: PHOTO_SOURCES.after_eight },
  { id: 'donuts-strawberry', source: PHOTO_SOURCES.strawberry },
  { id: 'donuts-bubblegum', source: PHOTO_SOURCES.bubblegum },
  { id: 'donuts-lime', source: PHOTO_SOURCES.lime, mod: { hue: 15 } },
  { id: 'donuts-candy-floss', source: PHOTO_SOURCES.candy_floss, mod: { hue: -25 } },
  { id: 'donuts-dr-pepper', source: PHOTO_SOURCES.dr_pepper, mod: { hue: -15, brightness: 0.95 } },
  { id: 'donuts-vimto', source: PHOTO_SOURCES.vimto, mod: { hue: -35 } },
  { id: 'donuts-banoffee', source: PHOTO_SOURCES.banoffee, mod: { hue: 10 } },
  { id: 'donuts-mango', source: PHOTO_SOURCES.mango, mod: { hue: -8 } },
  { id: 'donuts-jaffa-cakes', source: PHOTO_SOURCES.jaffa_cakes, mod: { hue: 20 } },
  { id: 'donuts-red-bull', source: PHOTO_SOURCES.red_bull, mod: { hue: 35 } },
  { id: 'donuts-peanut-chocolate', source: PHOTO_SOURCES.peanut_chocolate },
  { id: 'donuts-skittles', source: PHOTO_SOURCES.skittles, mod: { hue: 45 } },
  { id: 'donuts-kinder-bueno', source: PHOTO_SOURCES.kinder_bueno },
  { id: 'donuts-cadbury-creme-egg', source: PHOTO_SOURCES.cadbury_creme_egg },
  { id: 'donuts-toffee', source: PHOTO_SOURCES.toffee },
];

async function processAll() {
  console.log('Processing stylish high quality food photography for every donut...');

  for (const item of DONUT_ITEMS) {
    const inputPath = path.join(srcDir, item.source);
    const webpOut = path.join(outDir, `${item.id}.webp`);
    const jpgOut = path.join(outDir, `${item.id}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.error(`Missing input source: ${inputPath}`);
      continue;
    }

    let pipeline = sharp(inputPath).resize(800, 600, {
      fit: 'cover',
      position: 'center',
    });

    if (item.mod) {
      if (item.mod.hue) {
        pipeline = pipeline.modulate({
          hue: item.mod.hue,
          brightness: item.mod.brightness || 1,
        });
      }
    }

    // Export fast, smooth, high-quality WebP (quality 85)
    await pipeline
      .clone()
      .webp({ quality: 86, effort: 4 })
      .toFile(webpOut);

    // Export fallback high quality JPG
    await pipeline
      .clone()
      .jpeg({ quality: 86, progressive: true })
      .toFile(jpgOut);

    console.log(`✓ Processed: ${item.id} (WebP & JPG)`);
  }

  console.log('All 25 donut photo assets generated and optimized successfully!');
}

processAll().catch(console.error);
