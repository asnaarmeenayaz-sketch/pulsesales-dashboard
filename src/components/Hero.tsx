import React from 'react';
import { ShieldCheck, Droplets, Sparkles, Figma, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenFigma: () => void;
  onOpenDeck: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenFigma, onOpenDeck }) => {
  return (
    <section id="top" className="relative pt-8 pb-20 border-b border-white/[0.08] overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & Messaging */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-amber-400">
              <span>6063-T6 ARCHITECTURAL ALLOY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100% TERMITE PROOF</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>WASHABLE INTERIORS</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Furniture Crafted For Generations. Zero Termites.
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              In Pakistan, over 45% of households lose wooden furniture to wood borers and termite decay. 
              AlumiCraft introduces pure, precision-extruded aluminum beds, wardrobes, and living suites. 
              Immune to pests, completely washable with water, and designed for modern life.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer shadow-lg shadow-amber-400/15"
              >
                <span>Explore 2026 Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenFigma}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
              >
                <Figma className="w-4 h-4 text-emerald-400" />
                <span>Open Figma Studio &amp; Export</span>
              </button>
            </div>

            {/* Quantitative Rigor adjacent to claim */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-2xl font-bold text-amber-400 font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Termite &amp; Pest Immune
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono tabular-nums">
                  PKR 20k–50k
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Direct Factory Pricing
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono tabular-nums">
                  25 Years
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Structural Warranty
                </div>
              </div>
            </div>

            {/* Presenter Attribution subtle note */}
            <div className="text-xs text-slate-400 pt-2 flex items-center gap-2">
              <span>GTM Research &amp; Presentation by Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah</span>
              <button 
                onClick={onOpenDeck} 
                className="text-amber-400 hover:underline cursor-pointer"
              >
                View 12-Slide Deck →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#14171f] shadow-2xl">
              <img
                src="/src/assets/images/alumicraft_hero_bedroom_1790145517053.jpg"
                alt="AlumiCraft Imperial King Bed in modern architectural bedroom"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] object-cover hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115]/90 via-[#0f1115]/20 to-transparent pointer-events-none" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0f1115]/80 backdrop-blur-md border border-white/[0.1] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400">FEATURED ARCHITECTURE</div>
                  <div className="text-sm font-semibold text-white">AlumiCraft Imperial King Suite</div>
                  <div className="text-xs text-slate-400 mt-0.5">High-tensile 6063-T6 aluminum extrusion with acoustic dampeners</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-base font-bold text-white">PKR 44,500</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3 h-3" />
                    <span>In Stock · Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative corner accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-amber-400/20 rounded-br-2xl pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
