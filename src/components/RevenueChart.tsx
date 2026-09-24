import React, { useState } from 'react';
import { MonthlyRevenueData, CurrencyConfig } from '../types/sales';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { TrendingUp, Layers, Target, Info } from 'lucide-react';

interface RevenueChartProps {
  data: MonthlyRevenueData[];
  currency: CurrencyConfig;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, currency }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(data.length - 1);
  const [showTarget, setShowTarget] = useState(true);
  const [showPipeline, setShowPipeline] = useState(true);

  // Calculate scales
  const maxRevenue = Math.max(...data.map((d) => Math.max(d.revenue, d.target, d.pipeline / 4)));
  const chartHeight = 240;
  const chartWidth = 720;
  const paddingX = 40;
  const paddingBottom = 30;
  const paddingTop = 20;

  const innerHeight = chartHeight - paddingTop - paddingBottom;
  const innerWidth = chartWidth - paddingX * 2;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * innerWidth;
  const getY = (value: number) => paddingTop + innerHeight - (value / maxRevenue) * innerHeight;

  // Build SVG paths
  const revenuePoints = data.map((d, i) => `${getX(i)},${getY(d.revenue)}`);
  const revenuePathD = `M ${revenuePoints.join(' L ')}`;
  const areaPathD = `${revenuePathD} L ${getX(data.length - 1)},${chartHeight - paddingBottom} L ${getX(0)},${chartHeight - paddingBottom} Z`;

  const targetPoints = data.map((d, i) => `${getX(i)},${getY(d.target)}`);
  const targetPathD = `M ${targetPoints.join(' L ')}`;

  const activeData = hoveredIdx !== null ? data[hoveredIdx] : data[data.length - 1];
  const attainment = (activeData.revenue / activeData.target) * 100;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">Revenue Velocity & Quota Pacing</h2>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {formatPercent(attainment)} Attainment
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            12-Month trailing performance vs board-approved quotas
          </p>
        </div>

        {/* Legend / Toggles */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setShowTarget(!showTarget)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
              showTarget
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-slate-800/40 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2 h-0.5 bg-amber-400 border-dashed"></span>
            <span>Target Quota</span>
          </button>

          <button
            onClick={() => setShowPipeline(!showPipeline)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
              showPipeline
                ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                : 'bg-slate-800/40 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-sm bg-blue-500/50"></span>
            <span>Pipeline Created</span>
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <span className="w-2.5 h-1 rounded-full bg-indigo-400"></span>
            <span>Actual ARR</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Display */}
      <div className="relative mt-4">
        {/* Hover inspection header */}
        {activeData && (
          <div className="flex flex-wrap items-center gap-4 mb-2 px-1 text-xs">
            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
              <span className="font-mono text-indigo-400">{activeData.month}:</span>
            </div>
            <div className="text-slate-300 font-mono">
              Actual: <span className="font-bold text-white">{formatCurrency(activeData.revenue, currency)}</span>
            </div>
            <div className="text-slate-300 font-mono">
              Target: <span className="text-amber-300">{formatCurrency(activeData.target, currency)}</span>
            </div>
            <div className="text-slate-300 font-mono">
              New Deals: <span className="text-emerald-400 font-semibold">{activeData.newDeals}</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Net Churn: {formatCurrency(activeData.churn, currency)}
            </div>
          </div>
        )}

        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="pipelineBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = paddingTop + innerHeight * (1 - ratio);
                const val = maxRevenue * ratio;
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="4,4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="JetBrains Mono"
                    >
                      {formatCurrency(val, currency, true)}
                    </text>
                  </g>
                );
              })}

              {/* Pipeline Bars */}
              {showPipeline &&
                data.map((d, i) => {
                  const x = getX(i);
                  const barHeight = (d.pipeline / (maxRevenue * 4)) * innerHeight * 0.9;
                  const y = chartHeight - paddingBottom - barHeight;
                  const barWidth = 14;
                  return (
                    <rect
                      key={`pipe-${i}`}
                      x={x - barWidth / 2}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="3"
                      fill="url(#pipelineBarGrad)"
                      stroke="#3b82f6"
                      strokeWidth="1"
                      strokeOpacity="0.5"
                    />
                  );
                })}

              {/* Area fill */}
              <path d={areaPathD} fill="url(#revenueGrad)" />

              {/* Target Quota Line */}
              {showTarget && (
                <path
                  d={targetPathD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  strokeOpacity="0.8"
                />
              )}

              {/* Revenue Actual Line */}
              <path
                d={revenuePathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interaction columns */}
              {data.map((d, i) => {
                const x = getX(i);
                const y = getY(d.revenue);
                const isHovered = hoveredIdx === i;

                return (
                  <g key={i}>
                    {/* Hover hit-area */}
                    <rect
                      x={x - innerWidth / (data.length * 2)}
                      y={0}
                      width={innerWidth / data.length}
                      height={chartHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(i)}
                    />

                    {/* Vertical guide when hovered */}
                    {isHovered && (
                      <line
                        x1={x}
                        y1={paddingTop}
                        x2={x}
                        y2={chartHeight - paddingBottom}
                        stroke="#818cf8"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                    )}

                    {/* Point marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 3.5}
                      fill={isHovered ? '#818cf8' : '#6366f1'}
                      stroke="#0f172a"
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />

                    {/* X-Axis Month label */}
                    <text
                      x={x}
                      y={chartHeight - 8}
                      fill={isHovered ? '#f1f5f9' : '#64748b'}
                      fontSize="10"
                      fontWeight={isHovered ? '600' : '400'}
                      textAnchor="middle"
                      fontFamily="JetBrains Mono"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
