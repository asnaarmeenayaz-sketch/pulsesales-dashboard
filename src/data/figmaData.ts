import JSZip from 'jszip';

export const FIGMA_TOKENS = {
  version: "1.0.0",
  name: "AlumiCraft Design System",
  colors: {
    brand: {
      aluminumDark: { value: "#0F1115", type: "color", description: "Dominant dark canvas" },
      aluminumSurface: { value: "#161920", type: "color", description: "Structural card surface" },
      aluminumBorder: { value: "rgba(255, 255, 255, 0.08)", type: "color", description: "Hairline border" },
      aluminumAccent: { value: "#F59E0B", type: "color", description: "Gold amber accent" },
      aluminumMuted: { value: "#93A0B5", type: "color", description: "Muted typographic metadata" },
      textPrimary: { value: "#ECEEF2", type: "color", description: "Primary readable prose" },
      termiteShieldGreen: { value: "#10B981", type: "color", description: "100% Termite immune badge" }
    },
    materials: {
      matteCharcoal: { value: "#262930", type: "color" },
      brushedSilver: { value: "#D1D5DB", type: "color" },
      walnutSublimation: { value: "#5C3A21", type: "color" },
      champagneBronze: { value: "#8C7853", type: "color" }
    }
  },
  typography: {
    fontFamilies: {
      display: { value: "Syne, sans-serif", type: "fontFamilies" },
      body: { value: "Plus Jakarta Sans, sans-serif", type: "fontFamilies" },
      mono: { value: "JetBrains Mono, monospace", type: "fontFamilies" }
    },
    fontSize: {
      xs: { value: "12px", type: "fontSizes" },
      sm: { value: "14px", type: "fontSizes" },
      base: { value: "16px", type: "fontSizes" },
      lg: { value: "18px", type: "fontSizes" },
      xl: { value: "24px", type: "fontSizes" },
      "2xl": { value: "32px", type: "fontSizes" },
      "3xl": { value: "48px", type: "fontSizes" },
      "4xl": { value: "64px", type: "fontSizes" }
    },
    lineHeights: {
      tight: { value: "1.1", type: "lineHeights" },
      snug: { value: "1.25", type: "lineHeights" },
      normal: { value: "1.5", type: "lineHeights" },
      relaxed: { value: "1.7", type: "lineHeights" }
    }
  },
  spacing: {
    "1": { value: "4px", type: "spacing" },
    "2": { value: "8px", type: "spacing" },
    "3": { value: "12px", type: "spacing" },
    "4": { value: "16px", type: "spacing" },
    "6": { value: "24px", type: "spacing" },
    "8": { value: "32px", type: "spacing" },
    "12": { value: "48px", type: "spacing" },
    "16": { value: "64px", type: "spacing" },
    "24": { value: "96px", type: "spacing" }
  },
  borderRadius: {
    sm: { value: "4px", type: "borderRadius" },
    md: { value: "8px", type: "borderRadius" },
    lg: { value: "12px", type: "borderRadius" },
    xl: { value: "16px", type: "borderRadius" }
  },
  elevation: {
    card: {
      value: {
        x: 0,
        y: 4,
        blur: 24,
        spread: 0,
        color: "rgba(0, 0, 0, 0.45)"
      },
      type: "boxShadow"
    }
  }
};

export const FIGMA_DOCUMENT_SCHEMA = {
  document: {
    id: "0:0",
    name: "AlumiCraft — Modern Aluminum Furniture & Interior Storefront",
    type: "DOCUMENT",
    children: [
      {
        id: "0:1",
        name: "Page 1: Storefront & Brand System",
        type: "CANVAS",
        backgroundColor: { r: 0.0588, g: 0.0667, b: 0.0824, a: 1 },
        children: [
          {
            id: "1:1",
            name: "Desktop 1440 — AlumiCraft Homepage",
            type: "FRAME",
            absoluteBoundingBox: { x: 0, y: 0, width: 1440, height: 3200 },
            layoutMode: "VERTICAL",
            primaryAxisSizingMode: "AUTO",
            counterAxisSizingMode: "FIXED",
            itemSpacing: 64,
            paddingLeft: 80,
            paddingRight: 80,
            paddingTop: 0,
            paddingBottom: 80,
            fills: [{ type: "SOLID", color: { r: 0.0588, g: 0.0667, b: 0.0824, a: 1 } }],
            children: [
              {
                id: "1:2",
                name: "Header Bar (Top Bar Contract: 3 Zones)",
                type: "FRAME",
                layoutMode: "HORIZONTAL",
                primaryAxisAlignItems: "SPACE_BETWEEN",
                counterAxisAlignItems: "CENTER",
                paddingTop: 24,
                paddingBottom: 24,
                fills: [],
                strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1, a: 0.08 } }],
                strokeWeight: 1
              },
              {
                id: "1:3",
                name: "Hero Section (Split Architectural Showcase)",
                type: "FRAME",
                layoutMode: "HORIZONTAL",
                itemSpacing: 48,
                paddingTop: 48,
                paddingBottom: 48
              },
              {
                id: "1:4",
                name: "Problem vs Solution: Wood Termite Crisis vs Aluminum Defense",
                type: "FRAME",
                layoutMode: "VERTICAL",
                itemSpacing: 32
              },
              {
                id: "1:5",
                name: "Featured Collection Grid (3 Columns, PKR 20k–50k)",
                type: "FRAME",
                layoutMode: "HORIZONTAL",
                itemSpacing: 24
              },
              {
                id: "1:6",
                name: "GTM Research Metrics & Presentation Deck Highlights",
                type: "FRAME",
                layoutMode: "HORIZONTAL",
                itemSpacing: 24
              }
            ]
          },
          {
            id: "2:1",
            name: "Presentation Slide 16:9 — AlumiCraft GTM Pitch Deck",
            type: "FRAME",
            absoluteBoundingBox: { x: 1600, y: 0, width: 1920, height: 1080 },
            layoutMode: "VERTICAL",
            paddingTop: 80,
            paddingBottom: 80,
            paddingLeft: 120,
            paddingRight: 120,
            fills: [{ type: "SOLID", color: { r: 0.07, g: 0.08, b: 0.1, a: 1 } }]
          }
        ]
      }
    ]
  }
};

export function generateFigmaSvgLanding(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="2200" viewBox="0 0 1440 2200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1440" height="2200" fill="#0F1115"/>
  
  <!-- Subtle Architectural Grid Guide -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
    </pattern>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1E26" />
      <stop offset="100%" stop-color="#13161C" />
    </linearGradient>
  </defs>
  <rect width="1440" height="2200" fill="url(#grid)"/>

  <!-- Top Bar (Header) -->
  <g id="Header_3_Zones">
    <rect x="0" y="0" width="1440" height="80" fill="#0F1115" fill-opacity="0.95"/>
    <line x1="0" y1="80" x2="1440" y2="80" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <!-- Zone 1: Wordmark -->
    <text x="80" y="48" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">AlumiCraft</text>
    <circle cx="196" cy="42" r="3.5" fill="#F59E0B" />
    <!-- Zone 2: Navigation Links -->
    <text x="500" y="46" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="500">Collection</text>
    <text x="610" y="46" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="500">Wood vs Aluminum</text>
    <text x="770" y="46" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="500">Custom Estimate</text>
    <text x="920" y="46" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="500">GTM Research</text>
    <text x="1050" y="46" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">Figma Studio</text>
    <!-- Zone 3: CTA Button -->
    <rect x="1220" y="22" width="140" height="38" rx="8" fill="url(#goldGrad)"/>
    <text x="1290" y="46" text-anchor="middle" fill="#0F1115" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">Request Quote</text>
  </g>

  <!-- Hero Section -->
  <g id="Hero_Section" transform="translate(80, 130)">
    <!-- Termite Badge / Kicker -->
    <text x="0" y="24" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12" font-weight="500" letter-spacing="1">100% TERMITE-PROOF · WASHABLE · PURE ALUMINUM INTERIOR</text>
    <!-- Main Headline -->
    <text x="0" y="90" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.5">Furniture Engineered</text>
    <text x="0" y="152" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.5">For Generations.</text>
    
    <!-- Subtitle -->
    <text x="0" y="200" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="400">
      Traditional wooden furniture in Pakistan faces chronic termite destruction (45.5%).
    </text>
    <text x="0" y="228" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="400">
      AlumiCraft delivers zero-maintenance, 100% waterproof pure aircraft-grade aluminum beds,
    </text>
    <text x="0" y="256" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="400">
      wardrobes, and living suites. Priced accessibly from PKR 20,000 to 50,000.
    </text>

    <!-- CTAs -->
    <rect x="0" y="295" width="180" height="48" rx="8" fill="url(#goldGrad)"/>
    <text x="90" y="325" text-anchor="middle" fill="#0F1115" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Explore Collection</text>
    
    <rect x="200" y="295" width="180" height="48" rx="8" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none"/>
    <text x="290" y="325" text-anchor="middle" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="600">Inspect in Figma</text>

    <!-- Key Metrics Cards -->
    <g transform="translate(0, 385)">
      <rect x="0" y="0" width="180" height="85" rx="8" fill="#14171F" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="20" y="34" fill="#F59E0B" font-family="Syne, sans-serif" font-size="26" font-weight="700">100%</text>
      <text x="20" y="60" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Termite Proof Guarantee</text>

      <rect x="200" y="0" width="180" height="85" rx="8" fill="#14171F" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="220" y="34" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="26" font-weight="700">68.3%</text>
      <text x="220" y="60" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Prioritize Durability</text>

      <rect x="400" y="0" width="180" height="85" rx="8" fill="#14171F" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="420" y="34" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="26" font-weight="700">25+ Yrs</text>
      <text x="420" y="60" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Structural Lifespan</text>
    </g>

    <!-- Hero Image Representation Frame -->
    <g transform="translate(640, 0)">
      <rect x="0" y="0" width="640" height="470" rx="16" fill="#1A1E26" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <rect x="20" y="20" width="600" height="430" rx="12" fill="#222733"/>
      <!-- Mock Illustration inside Frame -->
      <text x="320" y="220" text-anchor="middle" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="20" font-weight="700">AlumiCraft Imperial King Bed</text>
      <text x="320" y="250" text-anchor="middle" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">High-Tensile 6063-T6 Precision Aluminum Extrusion</text>
      <rect x="220" y="280" width="200" height="34" rx="17" fill="rgba(245, 158, 11, 0.15)"/>
      <text x="320" y="302" text-anchor="middle" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600">PKR 44,500 · ZERO TERMITES</text>
    </g>
  </g>

  <!-- Section 2: Product Catalog Grid -->
  <g id="Product_Grid" transform="translate(80, 720)">
    <text x="0" y="30" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="32" font-weight="700">Signature Household Collection</text>
    <text x="0" y="60" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="15">Engineered for Pakistani conditions · Mid-range accessible pricing</text>

    <!-- Card 1 -->
    <g transform="translate(0, 90)">
      <rect width="400" height="460" rx="12" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <rect x="20" y="20" width="360" height="230" rx="8" fill="#2A303D"/>
      <text x="200" y="140" text-anchor="middle" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">Imperial Bed 6063-T6</text>
      <text x="24" y="285" fill="#93A0B5" font-family="JetBrains Mono, monospace" font-size="11">BEDROOM · 100% IMMUNE</text>
      <text x="24" y="315" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="18" font-weight="700">Imperial King Bed</text>
      <text x="24" y="342" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">Washable slatted center spine, squeak-free</text>
      <text x="24" y="390" fill="#F59E0B" font-family="Syne, sans-serif" font-size="20" font-weight="700">PKR 44,500</text>
      <text x="145" y="390" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif" font-size="13" text-decoration="line-through">PKR 52,000</text>
      <rect x="24" y="410" width="352" height="34" rx="6" fill="#F59E0B"/>
      <text x="200" y="432" text-anchor="middle" fill="#0F1115" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">View Specifications</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(440, 90)">
      <rect width="400" height="460" rx="12" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <rect x="20" y="20" width="360" height="230" rx="8" fill="#2A303D"/>
      <text x="200" y="140" text-anchor="middle" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">Majlis Diwan &amp; Sofa</text>
      <text x="24" y="285" fill="#93A0B5" font-family="JetBrains Mono, monospace" font-size="11">LIVING · TIG WELDED</text>
      <text x="24" y="315" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="18" font-weight="700">Majlis Lounge &amp; Diwan</text>
      <text x="24" y="342" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">Stain-resistant fabric, featherweight alloy</text>
      <text x="24" y="390" fill="#F59E0B" font-family="Syne, sans-serif" font-size="20" font-weight="700">PKR 38,900</text>
      <text x="145" y="390" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif" font-size="13" text-decoration="line-through">PKR 46,000</text>
      <rect x="24" y="410" width="352" height="34" rx="6" fill="#F59E0B"/>
      <text x="200" y="432" text-anchor="middle" fill="#0F1115" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">View Specifications</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(880, 90)">
      <rect width="400" height="460" rx="12" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <rect x="20" y="20" width="360" height="230" rx="8" fill="#2A303D"/>
      <text x="200" y="140" text-anchor="middle" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">AeroSlide Quad Closet</text>
      <text x="24" y="285" fill="#93A0B5" font-family="JetBrains Mono, monospace" font-size="11">STORAGE · FLUTED GLASS</text>
      <text x="24" y="315" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="18" font-weight="700">AeroSlide Quad Wardrobe</text>
      <text x="24" y="342" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">Pest-proof magnetic perimeter seal</text>
      <text x="24" y="390" fill="#F59E0B" font-family="Syne, sans-serif" font-size="20" font-weight="700">PKR 49,500</text>
      <text x="145" y="390" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif" font-size="13" text-decoration="line-through">PKR 58,000</text>
      <rect x="24" y="410" width="352" height="34" rx="6" fill="#F59E0B"/>
      <text x="200" y="432" text-anchor="middle" fill="#0F1115" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">View Specifications</text>
    </g>
  </g>

  <!-- Section 3: Market Research & Presentation Summary -->
  <g id="Research_Section" transform="translate(80, 1340)">
    <rect width="1280" height="380" rx="16" fill="#14171F" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <text x="48" y="56" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="28" font-weight="700">Consumer Research Insights (Pakistan B2C Study)</text>
    <text x="48" y="86" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">
      Conducted by: Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah · 101 Verified Survey Respondents
    </text>

    <g transform="translate(48, 120)">
      <!-- Stat 1 -->
      <rect x="0" y="0" width="265" height="150" rx="8" fill="#1A1E26" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="24" y="44" fill="#F59E0B" font-family="Syne, sans-serif" font-size="34" font-weight="800">45.5%</text>
      <text x="24" y="76" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="600">Termite Infestation</text>
      <text x="24" y="104" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Reported wood furniture destroyed or infested in home</text>

      <!-- Stat 2 -->
      <rect x="295" y="0" width="265" height="150" rx="8" fill="#1A1E26" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="24" y="44" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="34" font-weight="800">68.3%</text>
      <text x="24" y="76" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="600">Durability Top Priority</text>
      <text x="24" y="104" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Value longevity above styling or traditional wood</text>

      <!-- Stat 3 -->
      <rect x="590" y="0" width="265" height="150" rx="8" fill="#1A1E26" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="24" y="44" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="34" font-weight="800">80.2%</text>
      <text x="24" y="76" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="600">Under 35 Demographic</text>
      <text x="24" y="104" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">18–25 (50.5%) and 26–35 (29.7%) urban digital-first</text>

      <!-- Stat 4 -->
      <rect x="885" y="0" width="265" height="150" rx="8" fill="#1A1E26" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="24" y="44" fill="#F59E0B" font-family="Syne, sans-serif" font-size="34" font-weight="800">PKR 20k–50k</text>
      <text x="24" y="76" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="600">Ideal Price Bracket</text>
      <text x="24" y="104" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Optimal conversion price point for first-movers</text>
    </g>

    <text x="48" y="320" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">
      Strategic takeaway: First-mover brand identity backed by digital video demos on YouTube &amp; Meta Ads.
    </text>
  </g>

  <!-- Footer -->
  <g id="Footer" transform="translate(80, 1820)">
    <line x1="0" y1="0" x2="1280" y2="0" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <text x="0" y="50" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="18" font-weight="700">AlumiCraft</text>
    <text x="0" y="80" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
      Pakistan's Premier Pure Aluminum Furniture &amp; Interior Manufacturer
    </text>
    <text x="0" y="105" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif" font-size="12">
      Research &amp; Presentation by Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah.
    </text>
    <text x="1280" y="50" text-anchor="end" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
      Karachi · Lahore · Islamabad Delivery
    </text>
    <text x="1280" y="80" text-anchor="end" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12">
      Exported for Figma (Auto-Layout Compatible)
    </text>
  </g>
</svg>`;
}

export function generateFigmaSlideDeckSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0F1115"/>
  <rect x="40" y="40" width="1840" height="1000" rx="16" fill="#14171F" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  
  <text x="120" y="160" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="18" font-weight="600" letter-spacing="2">PITCH DECK · SLIDE 08 / 12</text>
  <text x="120" y="240" fill="#ECEEF2" font-family="Syne, sans-serif" font-size="56" font-weight="800">The Aluminum Advantage</text>
  <text x="120" y="290" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="22">Empirical findings from 101 Pakistani household consumers</text>

  <!-- Left Column: The Problem -->
  <g transform="translate(120, 360)">
    <rect width="780" height="520" rx="16" fill="#1A1E26" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1"/>
    <text x="48" y="64" fill="#EF4444" font-family="Syne, sans-serif" font-size="28" font-weight="700">The Wooden Furniture Problem</text>
    <text x="48" y="105" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="16">Traditional wood failing modern Pakistani households</text>

    <text x="48" y="180" fill="#EF4444" font-family="Syne, sans-serif" font-size="64" font-weight="800">45.5%</text>
    <text x="48" y="220" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600">Struggling with Termites &amp; Pests</text>
    <text x="48" y="250" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Wood borers completely destroying internal beds &amp; wardrobes</text>

    <text x="48" y="340" fill="#F59E0B" font-family="Syne, sans-serif" font-size="64" font-weight="800">22.8%</text>
    <text x="48" y="380" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600">Frustrated by High Maintenance Costs</text>
    <text x="48" y="410" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Polishing, fumigation treatments, moisture warping during monsoon</text>
  </g>

  <!-- Right Column: The Aluminum Solution -->
  <g transform="translate(980, 360)">
    <rect width="780" height="520" rx="16" fill="#1A1E26" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1"/>
    <text x="48" y="64" fill="#10B981" font-family="Syne, sans-serif" font-size="28" font-weight="700">The Pure Aluminum Solution</text>
    <text x="48" y="105" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="16">100% Termite-Proof · Washable · Architectural Grade</text>

    <text x="48" y="180" fill="#10B981" font-family="Syne, sans-serif" font-size="64" font-weight="800">68.3%</text>
    <text x="48" y="220" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600">Consumer Demand for Durability &amp; Longevity</text>
    <text x="48" y="250" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Aluminum alloy delivers 25+ years without rot, moisture, or insect damage</text>

    <text x="48" y="340" fill="#3B82F6" font-family="Syne, sans-serif" font-size="64" font-weight="800">69.3%</text>
    <text x="48" y="380" fill="#ECEEF2" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="600">Social Media &amp; Video Ads Influence</text>
    <text x="48" y="410" fill="#93A0B5" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Primary conversion channel for 18–35 urban Pakistani demographic</text>
  </g>

  <!-- Presenter Footer -->
  <text x="120" y="990" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif" font-size="16">
    Presented by: Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah · AlumiCraft Go-to-Market Strategy
  </text>
  <text x="1760" y="990" text-anchor="end" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="15">
    Figma Design Vector Export
  </text>
</svg>`;
}

export async function downloadFigmaBundleZip(): Promise<void> {
  const zip = new JSZip();

  // 1. README
  const readmeContent = `# AlumiCraft Figma Design System & Asset Bundle
Thank you for downloading the official AlumiCraft Figma package!

## Contents:
1. \`tokens.json\` — Token Studio & Figma Variables tokens (Colors, Typography, Spacing, Radius, Shadows).
2. \`AlumiCraft-Storefront-1440px.svg\` — Complete desktop landing page artboard vector.
3. \`AlumiCraft-GTM-Pitch-Deck.svg\` — Presentation slide artboards vector.
4. \`figma-nodes.json\` — Figma REST API / Plugin document node structure.
5. \`alumicraft-variables.css\` — CSS Custom Properties matching the Figma design tokens.

## How to Import into Figma:
### Method A: Direct Vector Drag & Drop (Easiest)
1. Open Figma (desktop app or figma.com).
2. Create a new canvas or open an existing design file.
3. Drag and drop \`AlumiCraft-Storefront-1440px.svg\` directly into the canvas.
4. Figma will instantly parse all frames, text layers, vector paths, and colors!

### Method B: Token Studio / Figma Variables
1. Install "Tokens Studio for Figma" plugin.
2. Click "Load from JSON" and choose \`tokens.json\`.
3. All design tokens (Colors, Spacings, Radii, Fonts) will instantly populate your Figma file.

### Method C: JSON to Figma / HTML to Figma Plugin
1. Open Figma and run "JSON to Figma" or "HTML to Figma".
2. Paste the contents of \`figma-nodes.json\` to generate native Figma frames.

Presented by: Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah
AlumiCraft — 100% Termite-Proof Pure Aluminum Furniture & Interior
`;

  zip.file("README-FIGMA-INSTRUCTIONS.md", readmeContent);
  zip.file("tokens.json", JSON.stringify(FIGMA_TOKENS, null, 2));
  zip.file("figma-nodes.json", JSON.stringify(FIGMA_DOCUMENT_SCHEMA, null, 2));
  zip.file("AlumiCraft-Storefront-1440px.svg", generateFigmaSvgLanding());
  zip.file("AlumiCraft-GTM-Pitch-Deck.svg", generateFigmaSlideDeckSvg());
  
  const cssVariables = `:root {
  --color-canvas: #0F1115;
  --color-surface: #161920;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-accent: #F59E0B;
  --color-muted: #93A0B5;
  --color-text-primary: #ECEEF2;
  --color-termite-shield: #10B981;
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}`;
  zip.file("alumicraft-variables.css", cssVariables);

  const content = await zip.generateAsync({ type: "blob" });
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "AlumiCraft-Figma-Design-Package.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

export function downloadSingleFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
