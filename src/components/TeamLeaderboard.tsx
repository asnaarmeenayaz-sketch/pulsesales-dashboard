import React, { useState } from 'react';
import { SalesRep, CurrencyConfig } from '../types/sales';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { Trophy, Award, Flame, Zap, DollarSign, Target, ChevronRight } from 'lucide-react';

interface TeamLeaderboardProps {
  reps: SalesRep[];
  currency: CurrencyConfig;
}

export const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({ reps, currency }) => {
  const [selectedRep, setSelectedRep] = useState<SalesRep | null>(null);

  // Sort by attainment percentage
  const sortedReps = [...reps].sort((a, b) => {
    const attainA = (a.closedRevenue / a.quota) * 100;
    const attainB = (b.closedRevenue / b.quota) * 100;
    return attainB - attainA;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">Sales Team Leaderboard & Quota Attainment</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              President's Club Pacing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual target progress, commission payouts, and deal closure velocity
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Team Quota: <span className="text-white font-bold">{formatCurrency(6150000, currency, true)}</span>
        </div>
      </div>

      {/* Reps Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sortedReps.map((rep, index) => {
          const attainment = (rep.closedRevenue / rep.quota) * 100;
          const isOverQuota = attainment >= 100;
          const isLeader = index === 0;

          return (
            <div
              key={rep.id}
              onClick={() => setSelectedRep(rep)}
              className={`bg-slate-950/70 border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer relative overflow-hidden group ${
                isLeader
                  ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/10 via-slate-950 to-slate-950'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Leader Ribbon / Badge */}
              {isLeader && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Trophy className="w-2.5 h-2.5" />
                  #1 Rank
                </div>
              )}

              {/* Rep Info */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-slate-700 group-hover:border-indigo-500 transition-colors"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                      index === 0
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : index === 1
                        ? 'bg-slate-300 text-slate-950 border-slate-200'
                        : index === 2
                        ? 'bg-amber-700 text-white border-amber-600'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white truncate">{rep.name}</h3>
                    {rep.streakMonths > 2 && (
                      <span className="text-[10px] font-medium px-1 rounded bg-orange-500/20 text-orange-400 flex items-center gap-0.5" title={`${rep.streakMonths} months quota crushed!`}>
                        <Flame className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                        {rep.streakMonths}m
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{rep.role}</p>
                  <p className="text-[10px] font-mono text-indigo-400 mt-0.5">{rep.region}</p>
                </div>
              </div>

              {/* Attainment Bar */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Target className="w-3 h-3 text-slate-500" />
                    Attainment
                  </span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      isOverQuota ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {formatPercent(attainment)}
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isOverQuota
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-indigo-500 to-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, attainment)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                  <span>Closed: <strong className="text-white">{formatCurrency(rep.closedRevenue, currency, true)}</strong></span>
                  <span>Target: {formatCurrency(rep.quota, currency, true)}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">Win Rate</div>
                  <div className="font-mono font-bold text-white text-xs mt-0.5">{rep.winRate}%</div>
                </div>
                <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">Pipeline</div>
                  <div className="font-mono font-bold text-indigo-300 text-xs mt-0.5">{formatCurrency(rep.pipelineValue, currency, true)}</div>
                </div>
                <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">Commissions</div>
                  <div className="font-mono font-bold text-emerald-400 text-xs mt-0.5">{formatCurrency(rep.commissionEarned, currency, true)}</div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-1">
                {rep.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Rep Detail Modal */}
      {selectedRep && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedRep(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRep.avatar}
                  alt={selectedRep.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{selectedRep.name}</h3>
                  <p className="text-xs text-slate-400">{selectedRep.role}</p>
                  <p className="text-xs font-mono text-indigo-400">{selectedRep.email} • {selectedRep.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRep(null)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Quota Attainment</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                    {formatPercent((selectedRep.closedRevenue / selectedRep.quota) * 100)}
                  </div>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    {formatCurrency(selectedRep.closedRevenue, currency)} / {formatCurrency(selectedRep.quota, currency)}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Commission Paid Out</div>
                  <div className="text-xl font-mono font-bold text-indigo-400 mt-1">
                    {formatCurrency(selectedRep.commissionEarned, currency)}
                  </div>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    Accelerated tier unlocked
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Deals Won Count:</span>
                  <strong className="text-white font-mono">{selectedRep.dealsWonCount} deals</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Active Pipeline Deals:</span>
                  <strong className="text-white font-mono">{selectedRep.dealsActiveCount} deals</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Average Sales Cycle:</span>
                  <strong className="text-white font-mono">{selectedRep.averageDealCycleDays} days</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Territory / Region:</span>
                  <strong className="text-indigo-400 font-mono">{selectedRep.region}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRep(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
