import React from 'react';
import { Deal, CurrencyConfig } from '../types/sales';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { Globe2, Compass, Share2, Layers } from 'lucide-react';

interface RegionalAttributionProps {
  deals: Deal[];
  currency: CurrencyConfig;
}

export const RegionalAttribution: React.FC<RegionalAttributionProps> = ({ deals, currency }) => {
  // Region breakdown
  const regions = [
    { name: 'North America', pct: 54, color: 'bg-indigo-500', dealsCount: 38, rev: 3140000 },
    { name: 'EMEA', pct: 26, color: 'bg-blue-500', dealsCount: 18, rev: 1515000 },
    { name: 'APAC', pct: 14, color: 'bg-purple-500', dealsCount: 10, rev: 815000 },
    { name: 'LATAM', pct: 6, color: 'bg-emerald-500', dealsCount: 4, rev: 350000 },
  ];

  // Lead source breakdown
  const sources = [
    { name: 'Partner Ecosystem', pct: 32, color: 'bg-violet-500', value: 1860000 },
    { name: 'Executive Referrals', pct: 28, color: 'bg-emerald-500', value: 1630000 },
    { name: 'Outbound SDR Pipeline', pct: 22, color: 'bg-blue-500', value: 1280000 },
    { name: 'Inbound Organic / Paid', pct: 12, color: 'bg-amber-500', value: 700000 },
    { name: 'Product Led Growth (PLG)', pct: 6, color: 'bg-rose-500', value: 350000 },
  ];

  // Segment breakdown
  const segments = [
    { name: 'Enterprise ($100k+)', pct: 64, color: 'bg-indigo-500' },
    { name: 'Mid-Market ($30k-$100k)', pct: 28, color: 'bg-cyan-500' },
    { name: 'SMB / Growth (<$30k)', pct: 8, color: 'bg-slate-500' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
      {/* 1. Regional Geography Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Geographic Revenue Distribution</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">4 Global Hubs</span>
        </div>

        {/* Stacked bar visual */}
        <div className="w-full h-3 rounded-md overflow-hidden flex bg-slate-800">
          {regions.map((r, i) => (
            <div
              key={i}
              className={`${r.color} h-full transition-all duration-500`}
              style={{ width: `${r.pct}%` }}
              title={`${r.name}: ${r.pct}%`}
            />
          ))}
        </div>

        <div className="space-y-2 pt-1 text-xs">
          {regions.map((r, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-sm ${r.color}`}></span>
                <span className="text-slate-300">{r.name}</span>
                <span className="text-[10px] text-slate-500">({r.dealsCount} deals)</span>
              </div>
              <div className="font-mono text-right">
                <span className="text-white font-semibold mr-2">{formatCurrency(r.rev, currency, true)}</span>
                <span className="text-slate-400">{r.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Source Channel Attribution */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Pipeline Source Attribution</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">ARR Yield</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {sources.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>{s.name}</span>
                <span className="font-mono text-white font-semibold">
                  {formatCurrency(s.value, currency, true)} ({s.pct}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`${s.color} h-full rounded-full`}
                  style={{ width: `${s.pct * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Market Segment Mix */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Market Segment Mix</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Enterprise Heavy</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-white">Enterprise Shift Impact</div>
          <p className="text-slate-400 text-[11px]">
            Enterprise accounts represent 64% of closed ARR with an average contract value (ACV) of {formatCurrency(280000, currency, true)} and 99.1% net revenue retention.
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          {segments.map((seg, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>{seg.name}</span>
                <span className="font-mono text-white font-semibold">{seg.pct}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`${seg.color} h-full rounded-full`}
                  style={{ width: `${seg.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
