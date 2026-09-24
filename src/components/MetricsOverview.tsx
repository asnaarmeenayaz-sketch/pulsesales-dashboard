import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Layers,
  Target,
  Briefcase,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

import {
  SalesDashboardMetrics,
  CurrencyConfig,
} from '../types/sales';

import {
  formatCurrency,
  formatPercent,
} from '../utils/formatters';

interface MetricsOverviewProps {
  metrics: SalesDashboardMetrics;
  currency: CurrencyConfig;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
  currency,
}) => {
  const cards = [
    {
      label: 'Annual Recurring Revenue',
      value: formatCurrency(
        metrics.totalARR,
        currency
      ),
      subtext: `+${metrics.growthRateYoY}% YoY Growth`,
      secondary: `Expansion: ${formatCurrency(
        metrics.expansionARR,
        currency,
        true
      )}`,
      icon: DollarSign,
      trend: 'positive',
      sparkline: [28, 31, 34, 38, 41, 46, 52, 58],
    },

    {
      label: 'Monthly Recurring Revenue',
      value: formatCurrency(
        metrics.totalMRR,
        currency
      ),
      subtext: '+8.4% MoM Growth',
      secondary: 'Current recurring revenue run-rate',
      icon: TrendingUp,
      trend: 'positive',
      sparkline: [34, 36, 42, 39, 44, 49, 46, 58],
    },

    {
      label: 'Pipeline Opportunity',
      value: formatCurrency(
        metrics.pipelineValue,
        currency
      ),
      subtext: `Weighted: ${formatCurrency(
        metrics.weightedPipeline,
        currency,
        true
      )}`,
      secondary: `${metrics.activeOpportunities} active opportunities`,
      icon: Layers,
      trend: 'neutral',
      sparkline: [40, 48, 45, 55, 62, 60, 71, 78],
    },

    {
      label: 'Quarter Quota Attainment',
      value: formatPercent(
        metrics.quarterAttainment
      ),
      subtext:
        metrics.quarterAttainment >= 100
          ? 'Above target'
          : 'Tracking toward target',
      secondary: `${metrics.dealsClosedThisQuarter} deals closed this quarter`,
      icon: Target,
      trend:
        metrics.quarterAttainment >= 100
          ? 'positive'
          : 'warning',
      sparkline: [65, 72, 80, 88, 94, 99, 106, 112],
    },

    {
      label: 'Average Deal Size',
      value: formatCurrency(
        metrics.avgDealSize,
        currency
      ),
      subtext: 'Average contract value',
      secondary: 'Based on current deal mix',
      icon: Briefcase,
      trend: 'positive',
      sparkline: [50, 52, 58, 64, 61, 70, 76, 84],
    },

    {
      label: 'Win Rate',
      value: formatPercent(
        metrics.winRate
      ),
      subtext: 'Current conversion rate',
      secondary: `CAC payback: ${metrics.cacPaybackMonths} months`,
      icon: CheckCircle2,
      trend: 'positive',
      sparkline: [28, 30, 29, 32, 33, 35, 34, 36],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {cards.map((card, idx) => {
        const Icon = card.icon;

        const trendClasses =
          card.trend === 'positive'
            ? 'text-emerald-400'
            : card.trend === 'warning'
            ? 'text-amber-400'
            : 'text-slate-400';

        return (
          <div
            key={card.label}
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 rounded-xl p-4 sm:p-5 transition-all duration-200 shadow-sm hover:shadow-lg"
          >

            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-slate-400 leading-tight">
                  {card.label}
                </span>
              </div>

              <div className="shrink-0 p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/50 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-all">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main value */}
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                {card.value}
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 pt-3 border-t border-slate-800/70">
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0 space-y-1">
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${trendClasses}`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    <span>{card.subtext}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    {card.secondary}
                  </div>
                </div>

                {/* Sparkline */}
                <div className="w-16 h-7 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg
                    viewBox="0 0 60 25"
                    className="w-full h-full overflow-visible"
                  >
                    <polyline
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={card.sparkline
                        .map((val, i) => {
                          const x =
                            (i /
                              (card.sparkline.length - 1)) *
                              58 +
                            1;

                          const min = Math.min(
                            ...card.sparkline
                          );

                          const max = Math.max(
                            ...card.sparkline
                          );

                          const y =
                            23 -
                            ((val - min) /
                              (max - min || 1)) *
                              18;

                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};
