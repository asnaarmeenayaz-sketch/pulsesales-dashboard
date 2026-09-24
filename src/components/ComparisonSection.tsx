import React, { useState } from 'react';
import { Check, X, ShieldAlert, Sparkles, Droplets, Feather, RefreshCw, Clock } from 'lucide-react';

interface ComparisonSectionProps {
  onOpenDeck: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenDeck }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'visual'>('table');

  const comparisonData = [
    {
      factor: 'Termite & Borer Resistance',
      wood: 'Severe threat (45.5% of Pakistani households suffer termite damage)',
      aluminum: '100% immune — zero organic cellulose for pests to eat',
      winner: 'aluminum',
      icon: ShieldAlert
    },
    {
      factor: 'Water & Monsoon Washability',
      wood: 'Swells, bends, and rots with floor water, mopping, or humidity',
      aluminum: 'Completely washable — hose down or wipe with water & soap safely',
      winner: 'aluminum',
      icon: Droplets
    },
    {
      factor: 'Weight & Relocation Ease',
      wood: 'Extremely heavy (60kg–90kg), difficult to move when cleaning rooms',
      aluminum: 'Featherweight structural hollow profiles (20kg–30kg), effortlessly lifted',
      winner: 'aluminum',
      icon: Feather
    },
    {
      factor: 'Maintenance & Upkeep Cost',
      wood: 'Requires repeated lacquer polishing, chemical fumigation, and crack sealing',
      aluminum: 'Zero maintenance — electrostatic powder-coat lasts 25+ years without chipping',
      winner: 'aluminum',
      icon: RefreshCw
    },
    {
      factor: 'Lifespan & Investment Return',
      wood: '5 to 8 years before termite infestation or joints loosen',
      aluminum: 'Decades of structural integrity with high scrap and resale value',
      winner: 'aluminum',
      icon: Clock
    },
    {
      factor: 'Price Range',
      wood: 'PKR 65,000 – 140,000 for genuine Sheesham/Teak wood',
      aluminum: 'PKR 20,000 – 50,000 (accessible mid-range factory price)',
      winner: 'aluminum',
      icon: Sparkles
    }
  ];

  return (
    <section id="comparison" className="py-20 border-b border-white/[0.08] bg-[#0c0e12]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-wider">
              MARKET EMPIRICAL FINDINGS · 101 SURVEYED PARTICIPANTS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Pure Aluminum Outperforms Traditional Wood
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Survey data reveals 45.5% of homeowners in Pakistan face termite destruction in wooden furniture, 
              while 68.3% prioritize long-term durability over traditional materials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDeck}
              className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
            >
              Examine Survey Methodology (Slide 06) →
            </button>
          </div>
        </div>

        {/* Survey Stat Spotlight Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#14171f] border border-red-500/20">
            <div className="text-xs font-mono text-red-400">SURVEY PAIN POINT #1</div>
            <div className="font-display text-3xl font-bold text-red-400 mt-2 font-mono tabular-nums">45.5%</div>
            <div className="text-sm font-semibold text-white mt-1">Struggling with Termite Infestations</div>
            <p className="text-xs text-slate-400 mt-2">
              Wooden beds, door frames, and wardrobes in Karachi, Lahore, and Islamabad get hollowed out within 3–5 years.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14171f] border border-amber-500/20">
            <div className="text-xs font-mono text-amber-400">SURVEY PAIN POINT #2</div>
            <div className="font-display text-3xl font-bold text-amber-400 mt-2 font-mono tabular-nums">22.8%</div>
            <div className="text-sm font-semibold text-white mt-1">Frustrated by High Maintenance Costs</div>
            <p className="text-xs text-slate-400 mt-2">
              Annual wood polishing, fumigation chemicals, and repairing warped drawers create recurring financial drain.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14171f] border border-emerald-500/20">
            <div className="text-xs font-mono text-emerald-400">CONSUMER PRIORITY #1</div>
            <div className="font-display text-3xl font-bold text-emerald-400 mt-2 font-mono tabular-nums">68.3%</div>
            <div className="text-sm font-semibold text-white mt-1">Durability &amp; Longevity Top Priority</div>
            <p className="text-xs text-slate-400 mt-2">
              Consumers actively seek modern alternatives that will endure for decades without deterioration.
            </p>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#14171f]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#1a1e27]">
                <th className="p-5 text-xs font-mono text-slate-400 uppercase tracking-wider w-1/4">
                  Feature / Parameter
                </th>
                <th className="p-5 text-xs font-mono text-red-400/90 uppercase tracking-wider w-3/8">
                  Traditional Wood Furniture (MDF / Sheesham)
                </th>
                <th className="p-5 text-xs font-mono text-emerald-400 uppercase tracking-wider w-3/8 bg-emerald-500/[0.04]">
                  AlumiCraft Pure Architectural Aluminum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-sm">
              {comparisonData.map((row, index) => {
                const IconComponent = row.icon;
                return (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-medium text-white flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{row.factor}</span>
                    </td>
                    <td className="p-5 text-slate-300">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.wood}</span>
                      </div>
                    </td>
                    <td className="p-5 text-slate-200 bg-emerald-500/[0.03]">
                      <div className="flex items-start gap-2 font-medium">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.aluminum}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Strategic Takeaway Banner */}
        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-amber-500/[0.08] to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-300">
            <span className="font-semibold text-white">Three Pillars to Success:</span> Positioned as "Invest Once" due to pest immunity and moisture resistance.
          </div>
          <button
            onClick={onOpenDeck}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Review GTM Strategy (Slide 10)
          </button>
        </div>

      </div>
    </section>
  );
};
