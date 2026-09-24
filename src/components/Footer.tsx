import React from 'react';
import { ShieldCheck, Droplets, Figma, Presentation, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenDeck: () => void;
  onOpenFigma: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDeck,
  onOpenFigma,
  onNavigate
}) => {
  return (
    <footer className="bg-[#0a0c10] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-[1440px] mx-auto px-6 py-16 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white tracking-tight">
                AlumiCraft
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan's first dedicated household pure aluminum furniture manufacturer. 
              Solving the 45.5% termite epidemic with 100% waterproof, washable, decades-durable interior solutions.
            </p>

            <div className="pt-2 text-[11px] text-slate-500 font-mono space-y-1">
              <div>Research &amp; GTM Strategy Team:</div>
              <div className="text-slate-300 font-medium">
                Asna Armeen Ayaz · Anzal · Azeem · Sufiyan · Abdullah
              </div>
            </div>
          </div>

          {/* Nav Col */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">
              Furniture Range
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Imperial King Beds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Majlis Lounge &amp; Diwans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  AeroSlide Quad Wardrobes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Damp-Proof Kitchen Islands
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Architectural Dining Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Figma Tools */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">
              Research &amp; Figma
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenFigma} className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <Figma className="w-3.5 h-3.5" />
                  <span>Figma Design Studio</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenFigma} className="hover:text-white transition-colors cursor-pointer">
                  Export Vector SVG Artboard
                </button>
              </li>
              <li>
                <button onClick={onOpenFigma} className="hover:text-white transition-colors cursor-pointer">
                  Tokens Studio JSON
                </button>
              </li>
              <li>
                <button onClick={onOpenDeck} className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <Presentation className="w-3.5 h-3.5" />
                  <span>12-Slide Pitch Deck</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comparison')} className="hover:text-white transition-colors cursor-pointer">
                  Wood vs. Aluminum Study
                </button>
              </li>
            </ul>
          </div>

          {/* Production & Deliveries */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">
              Nationwide Delivery
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Fabrication in Karachi &amp; Lahore. Direct delivery across all major cities in Pakistan.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>25-Year Termite Immunity Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>100% Washable &amp; Weatherproof</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} AlumiCraft Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Alloy 6063-T6 Architectural Grade</span>
            <span>·</span>
            <span>Figma Auto-Layout System</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
