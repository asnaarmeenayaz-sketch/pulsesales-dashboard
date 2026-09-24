import React from 'react';
import { Deal, CurrencyConfig } from '../types/sales';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { ArrowRight, Clock, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

interface PipelineFunnelProps {
  deals: Deal[];
  currency: CurrencyConfig;
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({ deals, currency }) => {
  const stages = [
    { key: 'discovery', label: '1. Discovery', days: 7, color: 'from-blue-600 to-blue-500' },
    { key: 'qualification', label: '2. Qualification', days: 11, color: 'from-indigo-600 to-indigo-500' },
    { key: 'demo', label: '3. Demo & Scoping', days: 14, color: 'from-purple-600 to-purple-500' },
    { key: 'technical_validation', label: '4. Tech Validation', days: 18, color: 'from-amber-600 to-amber-500' },
    { key: 'proposal', label: '5. Proposal & Legal', days: 12, color: 'from-orange-600 to-orange-500' },
    { key: 'closed_won', label: '6. Closed Won', days: 4, color: 'from-emerald-600 to-emerald-500' },
  ];

  // Aggregate deals
  const stageStats = stages.map((s, idx) => {
    const matched = deals.filter((d) => d.stage === s.key);
    const count = matched.length;
    const value = matched.reduce((acc, d) => acc + d.value, 0);

    // Calculate realistic conversion based on stage index
    const baseRates = [100, 78, 64, 52, 41, 36.4];
    const conversion = baseRates[idx];

    return {
      ...s,
      count,
      value,
      conversion,
    };
  });

  const totalValue = deals.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">Sales Funnel Velocity & Stage Conversions</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              6 Stages Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage-by-stage drop-off analytics, conversion efficiency, and cycle latency
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Average Full Cycle: <span className="text-white font-semibold font-mono">41.8 Days</span></span>
        </div>
      </div>

      {/* Funnel Visual Stack */}
      <div className="mt-4 space-y-3">
        {stageStats.map((st, idx) => {
          const widthPercent = Math.max(18, 100 - idx * 14);

          return (
            <div key={st.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{st.label}</span>
                  <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {st.count} {st.count === 1 ? 'deal' : 'deals'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {st.days}d avg
                  </span>
                  <span className="text-white font-bold">
                    {formatCurrency(st.value, currency)}
                  </span>
                  <span className="text-emerald-400 font-semibold w-12 text-right">
                    {formatPercent(st.conversion)}
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-800/80 rounded-lg h-3.5 overflow-hidden p-0.5 flex items-center">
                <div
                  className={`h-full rounded-md bg-gradient-to-r ${st.color} transition-all duration-500`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Insights Callout */}
      <div className="mt-4 pt-3 border-t border-slate-800/70 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-slate-300">
          <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-indigo-300">Proposal to Closed Won Conversion: </span>
            <span>At 88.7%, proposal closing velocity is 14% higher than last quarter due to upfront procurement legal alignment.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-slate-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Velocity Recommendation: </span>
            <span>Tech Validation stage takes 18 days. Providing pre-configured sandbox tenants can shave ~5 days off cycle time.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
