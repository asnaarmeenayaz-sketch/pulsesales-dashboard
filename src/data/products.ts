import { Product, FinishOption } from '../types';

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'charcoal',
    name: 'Matte Charcoal Grey',
    hex: '#262930',
    description: 'Electrostatic architectural powder-coat, anti-scratch satin finish'
  },
  {
    id: 'natural',
    name: 'Brushed Pure Silver',
    hex: '#D1D5DB',
    description: 'Anodized 25-micron natural aircraft-grade aluminum sheen'
  },
  {
    id: 'walnut',
    name: 'Sublimated Teak / Walnut',
    hex: '#5C3A21',
    description: 'Italian thermal woodgrain sublimation — looks like luxury wood, 100% termite-proof metal'
  },
  {
    id: 'bronze',
    name: 'Champagne Bronze',
    hex: '#8C7853',
    description: 'Brushed metallic bronze finish with UV-resistant sealant'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'imperial-king-bed',
    name: 'AlumiCraft Imperial King Bed',
    tagline: 'Precision extruded architectural aluminum king frame with ergonomic cushioned headboard',
    category: 'beds',
    pricePKR: 44500,
    originalPricePKR: 52000,
    image: '/src/assets/images/alumicraft_hero_bedroom_1790145517053.jpg',
    alloyGrade: '6063-T6 Structural Alloy',
    dimensions: '78" W × 82" L × 46" H',
    weightKg: 28,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 25,
    description: 'Eliminate termite damage and moisture rot forever. Handcrafted using high-tensile 6063-T6 aluminum extrusions with integrated acoustic dampening pads to prevent squeaks. Can be hosed or washed with water directly.',
    features: [
      'Zero-termite, zero-borer guarantee for lifetime',
      'Washable frame — clean with wet cloth or water wash',
      'Weighs only 28kg — 60% lighter than heavy solid sheesham wood',
      'Reinforced modular center spine supports up to 850 kg',
      'Silent-glide acoustic joint dampeners prevent squeaks'
    ],
    specs: {
      'Frame Material': 'High-Tensile 6063-T6 Aluminum Extrusion',
      'Wall Thickness': '2.2mm structural profiles',
      'Headboard': 'Water-repellent woven fabric over high-density foam',
      'Assembly': 'Toolless precision interlocking clip system (15 mins)',
      'Water Resistance': '100% Waterproof & Rustproof Anodization'
    }
  },
  {
    id: 'majlis-sofa-suite',
    name: 'AlumiCraft Majlis Lounge & Diwan Set',
    tagline: 'Lightweight welded aluminum 3-seater diwan sofa with stain-resistant cushions',
    category: 'living',
    pricePKR: 38900,
    originalPricePKR: 46000,
    image: '/src/assets/images/alumicraft_sofa_living_1790145536599.jpg',
    alloyGrade: '6061-T6 Aircraft Grade',
    dimensions: '84" W × 34" D × 32" H',
    weightKg: 22,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 20,
    description: 'Designed specifically for modern Pakistani homes. Traditional wooden sofas in humid monsoon regions suffer from wood decay and pests. This pure aluminum lounge suite provides lifelong durability with modular removable upholstery.',
    features: [
      'Heavy-duty TIG-welded corners with seamless polished joints',
      'Resistant to humid Karachi monsoon dampness and dry Punjab heat',
      'Removable washable cushion covers with Teflon stain-guard',
      'Effortless repositioning for house cleaning',
      'Sublimated woodgrain or matte powder finish options'
    ],
    specs: {
      'Joint Construction': 'Full penetration robotic TIG weld',
      'Base Support': 'Extruded aluminum slatted platform',
      'Cushions': 'High-resilience 38-density dual-core foam',
      'Finish': 'AkzoNobel architectural grade powder-coat',
      'Weight Capacity': '600 kg static load'
    }
  },
  {
    id: 'aeroslide-quad-wardrobe',
    name: 'AlumiCraft AeroSlide Quad Wardrobe',
    tagline: 'Modular 4-door aluminum closet with smoked fluted glass and insect-proof magnetic seals',
    category: 'wardrobes',
    pricePKR: 49500,
    originalPricePKR: 58000,
    image: '/src/assets/images/alumicraft_wardrobe_closet_1790145551380.jpg',
    alloyGrade: '6063-T5 Precision Extrusion',
    dimensions: '72" W × 24" D × 84" H',
    weightKg: 42,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 25,
    description: 'Wooden wardrobes are the #1 target for termites in Pakistani households, destroying expensive clothes and fabrics. The AeroSlide Quad creates a sealed, moisture-proof, termite-impervious haven for your wardrobe.',
    features: [
      'Airtight magnetic perimeter seals protect silks and woolens',
      'Never expands, warps, or sticks during monsoon humidity',
      'Integrated LED illumination with touch sensors',
      'Modular shelves and telescoping hanging rods',
      'Shatter-safe tempered fluted safety glass'
    ],
    specs: {
      'Track System': 'Heavy-duty nylon bearing top and bottom tandem rollers',
      'Glass Type': '5mm tempered fluted acoustic privacy glass',
      'Door Profiles': 'Slim-line 18mm architectural aluminum frame',
      'Ventilation': 'Micro-perforated breathable aluminum back panel',
      'Termite Rating': 'Zero organic matter — 100% immune'
    }
  },
  {
    id: 'chefmaster-kitchen-unit',
    name: 'AlumiCraft ChefMaster Kitchen Island & Cabinetry',
    tagline: 'Washable, fire-resistant, non-toxic aluminum kitchen carcass and island counter',
    category: 'kitchens',
    pricePKR: 34500,
    originalPricePKR: 42000,
    image: '/src/assets/images/alumicraft_kitchen_cabinets_1790145564834.jpg',
    alloyGrade: '3003/6063 Marine-Grade Aluminum',
    dimensions: '60" W × 30" D × 36" H',
    weightKg: 26,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 30,
    description: 'Kitchen moisture from sinks and cooking ruins chipboard and MDF wood within 2-3 years. AlumiCraft Kitchen modules can be hosed down completely, will never swell, and are 100% fire-safe and cockroach-proof.',
    features: [
      'Impervious to grease, turmeric/masala stains, and water leaks',
      'Class A1 Fireproof rating — does not burn or release toxic fumes',
      'Soft-close hydraulic German-standard hinges mounted into alloy',
      'Washable interior drawers with anti-slip silicone liners',
      'Resistant to cockroaches and food pests'
    ],
    specs: {
      'Carcass': '1.8mm solid extruded aluminum sandwich core',
      'Hinges': 'Grade 304 stainless steel soft-close hydraulic dampers',
      'Surface': 'Nano-ceramic hydrophobic easy-clean coating',
      'Load Per Shelf': '75 kg distributed weight',
      'Corrosion Class': 'C4 High Atmospheric Durability'
    }
  },
  {
    id: 'metro-coffee-table',
    name: 'AlumiCraft Metro Low Coffee Table',
    tagline: 'Minimalist interlocking aluminum profile with 8mm tempered glass surface',
    category: 'tables',
    pricePKR: 22500,
    originalPricePKR: 28000,
    image: '/src/assets/images/alumicraft_sofa_living_1790145536599.jpg',
    alloyGrade: '6063-T6 Aluminum',
    dimensions: '42" W × 24" D × 16" H',
    weightKg: 12,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 20,
    description: 'An architectural centerpiece for living spaces. Lightweight enough to easily lift when vacuuming or mopping, yet sturdy enough to support heavy decorative books and tea service.',
    features: [
      'Ultra-stable geometric cantilever design',
      'Floor-safe silicone non-marking foot pads',
      'Spill-proof, heat-proof, stain-proof',
      'Available in brushed silver or matte charcoal'
    ],
    specs: {
      'Glass': '8mm beveled edge tempered crystal glass',
      'Frame': 'High-spec hollow tubular aluminum profile',
      'Weight': '12 kg total',
      'Assembly': 'Pre-assembled out of the box'
    }
  },
  {
    id: 'cantilever-dining-set',
    name: 'AlumiCraft Banquet 6-Seater Dining Frame',
    tagline: 'Contemporary architectural dining table frame with weather-resistant alloy engineering',
    category: 'tables',
    pricePKR: 37500,
    originalPricePKR: 45000,
    image: '/src/assets/images/alumicraft_hero_bedroom_1790145517053.jpg',
    alloyGrade: '6061-T6 Structural Alloy',
    dimensions: '72" L × 36" W × 30" H',
    weightKg: 24,
    termiteProofGuarantee: '100% Lifetime Immunity',
    washable: true,
    warrantyYears: 25,
    description: 'Engineered for lively family dinners. Supports stone, marble, glass, or aluminum tabletops with zero wobble. Completely immune to liquid spills and termite infestation.',
    features: [
      'Accommodates 6 to 8 chairs comfortably',
      'Zero maintenance — wipe with mild soap and water',
      'Precision CNC milled connection nodes',
      'Does not warp in dry winters or humid summers'
    ],
    specs: {
      'Leg Profiles': '80mm × 40mm heavy extrusion',
      'Compatibility': 'Universal top mounting brackets included',
      'Max Tabletop Load': '250 kg',
      'Warranty': '25 Years Structural Guarantee'
    }
  }
];
