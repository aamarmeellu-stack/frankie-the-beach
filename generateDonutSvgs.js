import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('public/donuts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Complete flavor definitions matching the uploaded Frankie's menu board
const DONUT_VARIANTS = [
  {
    id: 'donuts-plain-2',
    name: 'Plain with Sugar',
    count: 2,
    type: 'plain',
    subtitle: '2 Hot Sugared Donuts',
    accentColor: '#F59E0B',
  },
  {
    id: 'donuts-plain-5',
    name: 'Plain with Sugar',
    count: 5,
    type: 'plain',
    subtitle: '5 Hot Sugared Donuts',
    accentColor: '#F59E0B',
  },
  {
    id: 'donuts-plain-10',
    name: 'Plain with Sugar',
    count: 10,
    type: 'plain',
    subtitle: '10 Hot Family Box',
    accentColor: '#F59E0B',
  },
  {
    id: 'donuts-ice-cream-toppings',
    name: 'Ice Cream & Toppings',
    count: 2,
    type: 'combo',
    subtitle: '2 Donuts + Ice Cream & Toppings',
    accentColor: '#EC4899',
    sauceColors: ['#EC4899', '#3B82F6'],
    hasToppings: 'mixed',
  },
  {
    id: 'donuts-ice-cream-sauce',
    name: 'Ice Cream & Sauce',
    count: 2,
    type: 'combo',
    subtitle: '2 Donuts + Soft Serve & Drizzle',
    accentColor: '#EF4444',
    sauceColors: ['#EF4444', '#78350F'],
    hasToppings: 'none',
  },
  {
    id: 'donuts-marshmallow',
    name: 'Marshmallow',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#F472B6',
    sauceColors: ['#F472B6', '#FB7185'],
    hasToppings: 'marshmallows',
  },
  {
    id: 'donuts-sprinkle',
    name: 'Sprinkle',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#E11D48',
    sauceColors: ['#E11D48'],
    hasToppings: 'sprinkles',
  },
  {
    id: 'donuts-biscoff',
    name: 'Lotus Biscoff',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#D97706',
    sauceColors: ['#B45309', '#D97706'],
    hasToppings: 'biscoff',
  },
  {
    id: 'donuts-oreo',
    name: 'OREO',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#1E293B',
    sauceColors: ['#1E1B4B', '#27272A'],
    hasToppings: 'oreo',
  },
  {
    id: 'donuts-after-eight',
    name: 'After Eight',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#059669',
    sauceColors: ['#10B981', '#3F2013'],
    hasToppings: 'mint',
  },
  {
    id: 'donuts-strawberry',
    name: 'Strawberry',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#DC2626',
    sauceColors: ['#DC2626', '#E11D48'],
    hasToppings: 'strawberry-coulis',
  },
  {
    id: 'donuts-bubblegum',
    name: 'Bubblegum',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#0284C7',
    sauceColors: ['#0284C7', '#38BDF8'],
    hasToppings: 'bubblegum-drops',
  },
  {
    id: 'donuts-lime',
    name: 'Lime',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#65A30D',
    sauceColors: ['#84CC16', '#65A30D'],
    hasToppings: 'lime-zest',
  },
  {
    id: 'donuts-candy-floss',
    name: 'Candy Floss',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#F43F5E',
    sauceColors: ['#FB7185', '#F43F5E'],
    hasToppings: 'candy-floss',
  },
  {
    id: 'donuts-dr-pepper',
    name: 'Dr Pepper',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#881337',
    sauceColors: ['#881337', '#701A75'],
    hasToppings: 'cherry-soda',
  },
  {
    id: 'donuts-vimto',
    name: 'Vimto',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#7E22CE',
    sauceColors: ['#7E22CE', '#9333EA'],
    hasToppings: 'purple-berries',
  },
  {
    id: 'donuts-banoffee',
    name: 'Banoffee',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#D97706',
    sauceColors: ['#D97706', '#FACC15'],
    hasToppings: 'banana-chips',
  },
  {
    id: 'donuts-mango',
    name: 'Mango',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#EA580C',
    sauceColors: ['#EA580C', '#FBAE17'],
    hasToppings: 'mango-coulis',
  },
  {
    id: 'donuts-jaffa-cakes',
    name: 'Jaffa Cakes',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#C2410C',
    sauceColors: ['#C2410C', '#271708'],
    hasToppings: 'jaffa-orange',
  },
  {
    id: 'donuts-red-bull',
    name: 'Red Bull',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#CA8A04',
    sauceColors: ['#EAB308', '#CA8A04'],
    hasToppings: 'energy-spark',
  },
  {
    id: 'donuts-peanut-chocolate',
    name: 'Peanut & Chocolate',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#B45309',
    sauceColors: ['#92400E', '#381C08'],
    hasToppings: 'peanuts',
  },
  {
    id: 'donuts-skittles',
    name: 'Skittles',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#E11D48',
    sauceColors: ['#E11D48', '#84CC16'],
    hasToppings: 'skittles',
  },
  {
    id: 'donuts-kinder-bueno',
    name: 'Kinder Bueno',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#9A3412',
    sauceColors: ['#D4A373', '#451A03'],
    hasToppings: 'bueno',
  },
  {
    id: 'donuts-cadbury-creme-egg',
    name: 'Cadbury Creme Egg',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#7C3AED',
    sauceColors: ['#FACC15', '#3E2723'],
    hasToppings: 'creme-egg',
  },
  {
    id: 'donuts-toffee',
    name: 'Toffee',
    count: 2,
    type: 'topped',
    subtitle: '2 TOPPED DONUTS',
    accentColor: '#B45309',
    sauceColors: ['#9A3412', '#B45309'],
    hasToppings: 'toffee-drops',
  },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateSvg(donut) {
  const isPlain = donut.type === 'plain';
  const primarySauce = donut.sauceColors ? donut.sauceColors[0] : '#D97706';
  const secondarySauce = donut.sauceColors && donut.sauceColors[1] ? donut.sauceColors[1] : primarySauce;
  const safeName = escapeXml(donut.name.toUpperCase());
  const safeSubtitle = escapeXml(donut.subtitle.toUpperCase());

  let toppingsContent = '';

  if (donut.hasToppings === 'sprinkles' || donut.hasToppings === 'mixed') {
    toppingsContent += `
      <!-- Sprinkles -->
      <g opacity="0.95">
        <rect x="230" y="140" width="14" height="4" rx="2" fill="#E11D48" transform="rotate(25 230 140)"/>
        <rect x="260" y="125" width="12" height="4" rx="2" fill="#3B82F6" transform="rotate(-35 260 125)"/>
        <rect x="280" y="150" width="13" height="4" rx="2" fill="#10B981" transform="rotate(40 280 150)"/>
        <rect x="310" y="130" width="14" height="4" rx="2" fill="#FACC15" transform="rotate(-15 310 130)"/>
        <rect x="340" y="155" width="13" height="4" rx="2" fill="#EC4899" transform="rotate(50 340 155)"/>
        <rect x="250" y="175" width="14" height="4" rx="2" fill="#8B5CF6" transform="rotate(-20 250 175)"/>
        <rect x="290" y="185" width="12" height="4" rx="2" fill="#F97316" transform="rotate(30 290 185)"/>
        <rect x="325" y="180" width="14" height="4" rx="2" fill="#06B6D4" transform="rotate(-45 325 180)"/>
        <rect x="360" y="195" width="13" height="4" rx="2" fill="#EF4444" transform="rotate(15 360 195)"/>
        <rect x="220" y="200" width="12" height="4" rx="2" fill="#FACC15" transform="rotate(-60 220 200)"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'marshmallows' || donut.hasToppings === 'mixed') {
    toppingsContent += `
      <!-- Fluffy Marshmallows -->
      <g filter="url(#drop-soft)">
        <rect x="235" y="145" width="18" height="14" rx="5" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.5" transform="rotate(-15 244 152)"/>
        <rect x="325" y="140" width="18" height="14" rx="5" fill="#FDF2F8" stroke="#F472B6" stroke-width="1.5" transform="rotate(20 334 147)"/>
        <rect x="275" y="125" width="18" height="14" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" transform="rotate(8 284 132)"/>
        <rect x="260" y="175" width="18" height="14" rx="5" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.5" transform="rotate(35 269 182)"/>
        <rect x="310" y="180" width="18" height="14" rx="5" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" transform="rotate(-25 319 187)"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'biscoff') {
    toppingsContent += `
      <!-- Lotus Biscoff Biscuit & Crumbs -->
      <g filter="url(#drop-soft)">
        <!-- Lotus Biscoff speculoos biscuit standing in swirl -->
        <g transform="translate(325, 95) rotate(22)">
          <rect x="-16" y="-32" width="32" height="64" rx="4" fill="#B45309" stroke="#78350F" stroke-width="2"/>
          <rect x="-12" y="-28" width="24" height="56" rx="2" fill="#D97706" stroke="#92400E" stroke-width="1" stroke-dasharray="3,3"/>
          <text x="0" y="4" font-family="'Arial Black', sans-serif" font-weight="900" font-size="8" fill="#FEF3C7" text-anchor="middle">Lotus</text>
        </g>
        <!-- Crunchy crumbs scatter -->
        <circle cx="245" cy="155" r="4" fill="#92400E"/>
        <circle cx="260" cy="140" r="3" fill="#B45309"/>
        <circle cx="280" cy="165" r="4.5" fill="#D97706"/>
        <circle cx="305" cy="180" r="3.5" fill="#78350F"/>
        <circle cx="355" cy="185" r="4" fill="#92400E"/>
        <circle cx="230" cy="190" r="3" fill="#B45309"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'oreo') {
    toppingsContent += `
      <!-- Oreo Cookie & Chocolate Crumbs -->
      <g filter="url(#drop-soft)">
        <!-- Oreo cookie standing in swirl -->
        <g transform="translate(325, 100) rotate(18)">
          <circle cx="0" cy="0" r="24" fill="#18181B" stroke="#27272A" stroke-width="3"/>
          <circle cx="0" cy="0" r="19" fill="#09090B" stroke="#3F3F46" stroke-width="1" stroke-dasharray="3,2"/>
          <path d="M -15,0 L 15,0" stroke="#FFFFFF" stroke-width="4" opacity="0.9"/>
          <text x="0" y="3" font-family="'Arial Black', sans-serif" font-weight="900" font-size="7" fill="#E4E4E7" text-anchor="middle">OREO</text>
        </g>
        <!-- Dark cookie crumbles -->
        <circle cx="240" cy="155" r="4.5" fill="#18181B"/>
        <circle cx="270" cy="140" r="3.5" fill="#27272A"/>
        <circle cx="295" cy="165" r="5" fill="#09090B"/>
        <circle cx="230" cy="185" r="4" fill="#18181B"/>
        <circle cx="350" cy="190" r="4.5" fill="#27272A"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'peanuts') {
    toppingsContent += `
      <!-- Crushed roasted peanuts -->
      <g filter="url(#drop-soft)">
        <ellipse cx="250" cy="150" rx="6" ry="4" fill="#D97706" transform="rotate(30 250 150)"/>
        <ellipse cx="280" cy="140" rx="5" ry="3.5" fill="#B45309" transform="rotate(-25 280 140)"/>
        <ellipse cx="320" cy="155" rx="6" ry="4" fill="#F59E0B" transform="rotate(45 320 155)"/>
        <ellipse cx="350" cy="180" rx="5.5" ry="3.5" fill="#D97706" transform="rotate(-15 350 180)"/>
        <ellipse cx="260" cy="185" rx="6" ry="4" fill="#92400E" transform="rotate(60 260 185)"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'bueno') {
    toppingsContent += `
      <!-- Kinder Bueno Chocolate Wafers -->
      <g filter="url(#drop-soft)" transform="translate(325, 105) rotate(20)">
        <rect x="-18" y="-28" width="36" height="56" rx="6" fill="#78350F" stroke="#451A03" stroke-width="2"/>
        <circle cx="0" cy="-14" r="8" fill="#9A3412" stroke="#451A03" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="8" fill="#9A3412" stroke="#451A03" stroke-width="1.5"/>
        <path d="M -16,0 L 16,0" stroke="#FDE68A" stroke-width="3"/>
      </g>
    `;
  }

  if (donut.hasToppings === 'creme-egg') {
    toppingsContent += `
      <!-- Cadbury Creme Egg Fondant & Shell -->
      <g filter="url(#drop-soft)">
        <!-- Egg chocolate shell piece -->
        <path d="M 315,90 C 335,90 350,115 345,135 C 340,150 320,155 310,140 Z" fill="#3B1C0B" stroke="#220F06" stroke-width="2" transform="rotate(15 325 120)"/>
        <!-- Yellow yolk swirl -->
        <circle cx="325" cy="120" r="10" fill="#FACC15" stroke="#EAB308" stroke-width="2"/>
        <ellipse cx="270" cy="160" rx="14" ry="7" fill="#FACC15" opacity="0.95" transform="rotate(-10 270 160)"/>
        <ellipse cx="270" cy="160" rx="8" ry="3.5" fill="#FFFFFF" opacity="0.9"/>
      </g>
    `;
  }

  // Donuts graphic layout
  let donutsGraphic = '';
  if (isPlain) {
    if (donut.count === 2) {
      donutsGraphic = `
        <!-- 2 Fresh Golden Sugared Donuts in seaside tray -->
        <g id="donut-left" filter="url(#drop-shadow)" transform="translate(210, 245)">
          <ellipse cx="0" cy="0" rx="85" ry="68" fill="url(#donut-dough-grad)"/>
          <ellipse cx="0" cy="0" rx="85" ry="68" fill="none" stroke="#B45309" stroke-width="3" opacity="0.6"/>
          <!-- Donut hole -->
          <ellipse cx="0" cy="2" rx="28" ry="22" fill="#54BAE6"/>
          <ellipse cx="0" cy="0" rx="28" ry="22" fill="none" stroke="#78350F" stroke-width="4" opacity="0.8"/>
          <!-- Granulated sugar sparkle speckles -->
          <circle cx="-45" cy="-20" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="-30" cy="30" r="3" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="50" cy="-15" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="35" cy="28" r="3" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="-15" cy="-40" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="15" cy="42" r="3" fill="#FFFFFF" opacity="0.9"/>
        </g>
        <g id="donut-right" filter="url(#drop-shadow)" transform="translate(365, 255)">
          <ellipse cx="0" cy="0" rx="88" ry="70" fill="url(#donut-dough-grad)"/>
          <ellipse cx="0" cy="0" rx="88" ry="70" fill="none" stroke="#B45309" stroke-width="3" opacity="0.6"/>
          <ellipse cx="0" cy="2" rx="29" ry="23" fill="#54BAE6"/>
          <ellipse cx="0" cy="0" rx="29" ry="23" fill="none" stroke="#78350F" stroke-width="4" opacity="0.8"/>
          <!-- Granulated sugar sparkles -->
          <circle cx="-48" cy="-22" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="-32" cy="32" r="3" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="52" cy="-18" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="38" cy="30" r="3" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="-18" cy="-42" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="18" cy="45" r="3" fill="#FFFFFF" opacity="0.9"/>
        </g>
      `;
    } else if (donut.count === 5) {
      donutsGraphic = `
        <!-- 5 Donuts Stacked -->
        <g filter="url(#drop-shadow)">
          <g transform="translate(180, 290) scale(0.85)"><ellipse cx="0" cy="0" rx="80" ry="62" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="25" ry="18" fill="#54BAE6"/></g>
          <g transform="translate(300, 295) scale(0.85)"><ellipse cx="0" cy="0" rx="80" ry="62" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="25" ry="18" fill="#54BAE6"/></g>
          <g transform="translate(420, 290) scale(0.85)"><ellipse cx="0" cy="0" rx="80" ry="62" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="25" ry="18" fill="#54BAE6"/></g>
          <g transform="translate(240, 230) scale(0.9)"><ellipse cx="0" cy="0" rx="80" ry="62" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="25" ry="18" fill="#54BAE6"/></g>
          <g transform="translate(360, 230) scale(0.9)"><ellipse cx="0" cy="0" rx="80" ry="62" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="25" ry="18" fill="#54BAE6"/></g>
        </g>
      `;
    } else {
      // 10 Family Box
      donutsGraphic = `
        <!-- 10 Family Sharing Donuts Box -->
        <g filter="url(#drop-shadow)">
          <rect x="100" y="190" width="400" height="150" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="4"/>
          <path d="M 100,230 L 500,230" stroke="#E2E8F0" stroke-width="2"/>
          <!-- Rows of donuts -->
          <g transform="translate(160, 235) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(230, 235) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(300, 235) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(370, 235) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(440, 235) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(160, 290) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(230, 290) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(300, 290) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(370, 290) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
          <g transform="translate(440, 290) scale(0.55)"><ellipse cx="0" cy="0" rx="75" ry="58" fill="url(#donut-dough-grad)"/><ellipse cx="0" cy="0" rx="24" ry="17" fill="#F8FAFC"/></g>
        </g>
      `;
    }
  } else {
    // 2 Topped Donuts with Soft-Serve Ice Cream Swirl and custom drizzles
    donutsGraphic = `
      <!-- Base Twin Hot Donuts -->
      <g filter="url(#drop-shadow)">
        <g id="base-donut-left" transform="translate(225, 275)">
          <ellipse cx="0" cy="0" rx="85" ry="62" fill="url(#donut-dough-grad)"/>
          <ellipse cx="0" cy="0" rx="85" ry="62" fill="none" stroke="#9A3412" stroke-width="2" opacity="0.6"/>
          <ellipse cx="0" cy="2" rx="26" ry="18" fill="#54BAE6"/>
          <ellipse cx="0" cy="0" rx="26" ry="18" fill="none" stroke="#78350F" stroke-width="3" opacity="0.7"/>
        </g>
        <g id="base-donut-right" transform="translate(375, 275)">
          <ellipse cx="0" cy="0" rx="85" ry="62" fill="url(#donut-dough-grad)"/>
          <ellipse cx="0" cy="0" rx="85" ry="62" fill="none" stroke="#9A3412" stroke-width="2" opacity="0.6"/>
          <ellipse cx="0" cy="2" rx="26" ry="18" fill="#54BAE6"/>
          <ellipse cx="0" cy="0" rx="26" ry="18" fill="none" stroke="#78350F" stroke-width="3" opacity="0.7"/>
        </g>
      </g>

      <!-- Soft Serve Vanilla Ice Cream Swirl -->
      <g id="ice-cream-tower" filter="url(#drop-soft)">
        <!-- Base Swirl -->
        <path d="M 215,245 C 215,215 250,205 300,205 C 350,205 385,215 385,245 C 385,260 355,270 300,270 C 245,270 215,260 215,245 Z" fill="#FFFDF7" stroke="#F1EAD8" stroke-width="2"/>
        <!-- Mid Tier 1 -->
        <path d="M 235,210 C 235,185 260,175 300,175 C 340,175 365,185 365,210 C 365,225 340,230 300,230 C 260,230 235,225 235,210 Z" fill="#FFFFFF" stroke="#F6EEDB" stroke-width="1.5"/>
        <!-- Mid Tier 2 -->
        <path d="M 255,175 C 255,150 275,140 300,140 C 325,140 345,150 345,175 C 345,190 325,195 300,195 C 275,195 255,190 255,175 Z" fill="#FFFDF7" stroke="#F6EEDB" stroke-width="1.5"/>
        <!-- Top Swirl Crest -->
        <path d="M 275,140 C 275,115 295,100 305,95 C 310,105 325,115 325,140 C 325,150 312,155 300,155 C 288,155 275,150 275,140 Z" fill="#FFFFFF" stroke="#F1EAD8" stroke-width="1.5"/>
        <path d="M 305,95 C 302,90 306,85 312,88 C 315,90 312,94 305,95 Z" fill="#FFFFFF"/>
      </g>

      <!-- Signature Cascading Sauce Ribbons -->
      <g id="sauce-drizzles" filter="url(#drop-soft)">
        <!-- Primary Sauce Wave 1 -->
        <path d="M 300,102 Q 312,125 305,145 Q 295,165 315,185 Q 335,205 325,235 Q 315,265 320,285" fill="none" stroke="${primarySauce}" stroke-width="7" stroke-linecap="round" opacity="0.95"/>
        <!-- Primary Sauce Wave 2 -->
        <path d="M 295,115 Q 275,135 285,160 Q 295,185 275,210 Q 255,235 265,265 Q 270,280 275,290" fill="none" stroke="${primarySauce}" stroke-width="8" stroke-linecap="round" opacity="0.95"/>
        <!-- Secondary Sauce Accent / Dual Swirl -->
        <path d="M 305,120 Q 325,145 318,170 Q 310,195 330,220 Q 350,245 345,275" fill="none" stroke="${secondarySauce}" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
        <path d="M 288,140 Q 268,165 262,190 Q 255,215 245,245" fill="none" stroke="${secondarySauce}" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
        <!-- Drip drops on donuts -->
        <circle cx="275" cy="290" r="4.5" fill="${primarySauce}"/>
        <circle cx="320" cy="285" r="4.5" fill="${primarySauce}"/>
        <circle cx="345" cy="275" r="4" fill="${secondarySauce}"/>
      </g>

      ${toppingsContent}
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <!-- Filter drops -->
    <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.35"/>
    </filter>
    <filter id="drop-soft" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#1E293B" flood-opacity="0.25"/>
    </filter>

    <!-- Background sunburst rays -->
    <radialGradient id="bg-sky" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#72D2FF"/>
      <stop offset="60%" stop-color="#3FA9E8"/>
      <stop offset="100%" stop-color="#1B82CC"/>
    </radialGradient>

    <!-- Warm Golden Baked Donut Dough Texture -->
    <radialGradient id="donut-dough-grad" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="45%" stop-color="#F59E0B"/>
      <stop offset="85%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>

    <!-- Yellow Frankie's Text Gradient -->
    <linearGradient id="gold-title-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="35%" stop-color="#FACC15"/>
      <stop offset="70%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>

    <!-- Seaside Sandy Floor -->
    <linearGradient id="promenade-floor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#55BFEF"/>
      <stop offset="30%" stop-color="#2697DB"/>
      <stop offset="100%" stop-color="#0E6CA8"/>
    </linearGradient>
  </defs>

  <!-- Seaside Sunburst Sky Background matching Frankie's menu sign -->
  <rect width="600" height="450" fill="url(#bg-sky)"/>

  <!-- Radiating sunburst retro stripes -->
  <g opacity="0.16" fill="#FFFFFF">
    <polygon points="300,225 0,0 60,0"/>
    <polygon points="300,225 150,0 210,0"/>
    <polygon points="300,225 300,0 360,0"/>
    <polygon points="300,225 450,0 510,0"/>
    <polygon points="300,225 600,0 600,60"/>
    <polygon points="300,225 600,150 600,210"/>
    <polygon points="300,225 600,300 600,360"/>
    <polygon points="300,225 600,450 540,450"/>
    <polygon points="300,225 450,450 390,450"/>
    <polygon points="300,225 300,450 240,450"/>
    <polygon points="300,225 150,450 90,450"/>
    <polygon points="300,225 0,450 0,390"/>
    <polygon points="300,225 0,300 0,240"/>
    <polygon points="300,225 0,150 0,90"/>
  </g>

  <!-- Boardwalk Promenade Platform Ground -->
  <ellipse cx="300" cy="385" rx="270" ry="55" fill="#0D5A8C" opacity="0.4" filter="url(#drop-shadow)"/>

  <!-- Main Donut Graphic Elements -->
  ${donutsGraphic}

  <!-- Header Banner: Frankie's @ The Beach Hot Donuts -->
  <g id="header-brand">
    <!-- Blue Oval Badge matching Frankie's Logo in picture -->
    <g transform="translate(100, 38)" filter="url(#drop-soft)">
      <ellipse cx="0" cy="0" rx="72" ry="24" fill="#0284C7" stroke="#FEF08A" stroke-width="2.5"/>
      <text x="0" y="-3" font-family="'Brush Script MT', 'Lucida Handwriting', cursive, sans-serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">Frankie's</text>
      <text x="0" y="13" font-family="'Arial Black', Impact, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">@ THE BEACH</text>
    </g>

    <!-- Top Badge / Quantity Pill -->
    <g transform="translate(500, 38)" filter="url(#drop-soft)">
      <rect x="-70" y="-18" width="140" height="36" rx="18" fill="#000000" fill-opacity="0.65" stroke="${donut.accentColor}" stroke-width="2"/>
      <text x="0" y="5" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">
        ${donut.count} DONUTS
      </text>
    </g>
  </g>

  <!-- Bottom Flavor Banner with Yellow Bold Lettering matching the real signage -->
  <g id="bottom-flavor-plate" transform="translate(300, 395)">
    <!-- Plate backing -->
    <rect x="-240" y="-32" width="480" height="64" rx="20" fill="#000E1F" fill-opacity="0.9" stroke="${donut.accentColor}" stroke-width="3" filter="url(#drop-shadow)"/>

    <!-- Category Subtitle Tag -->
    <text x="0" y="-10" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="12" fill="${donut.accentColor}" text-anchor="middle" letter-spacing="2">
      ${safeSubtitle}
    </text>

    <!-- Big Bold Yellow Flavor Name with Black Stroke (Identical to Sign) -->
    <text x="0" y="19" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="24" fill="url(#gold-title-grad)" stroke="#000000" stroke-width="1.5" text-anchor="middle" letter-spacing="1">
      ${safeName}
    </text>
  </g>

  <!-- Decorative Corner Accents -->
  <circle cx="25" cy="25" r="4" fill="#FEF08A" opacity="0.6"/>
  <circle cx="575" cy="25" r="4" fill="#FEF08A" opacity="0.6"/>
</svg>`;
}

// Generate all files
DONUT_VARIANTS.forEach((donut) => {
  const filePath = path.join(outputDir, `${donut.id}.svg`);
  const svgContent = generateSvg(donut);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`Generated: ${filePath}`);
});

console.log(`Successfully generated ${DONUT_VARIANTS.length} unique donut SVG assets!`);
