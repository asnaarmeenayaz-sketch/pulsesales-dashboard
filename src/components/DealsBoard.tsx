import React, { useMemo, useState } from 'react';
import {
  Deal,
  DealStage,
  CurrencyConfig,
} from '../types/sales';

import {
  formatCurrency,
  getStageColor,
  getPriorityBadge,
} from '../utils/formatters';

import {
  Kanban,
  Table as TableIcon,
  Search,
  ChevronRight,
  Trophy,
  Building,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';

import confetti from 'canvas-confetti';

interface DealsBoardProps {
  deals: Deal[];
  currency: CurrencyConfig;
  onAdvanceDealStage: (dealId: string) => void;
  onMarkDealWon: (dealId: string) => void;
  onSelectDeal: (deal: Deal) => void;
}

const STAGES: {
  key: DealStage;
  label: string;
  dot: string;
}[] = [
  {
    key: 'discovery',
    label: 'Discovery',
    dot: 'bg-blue-400',
  },
  {
    key: 'qualification',
    label: 'Qualification',
    dot: 'bg-indigo-400',
  },
  {
    key: 'demo',
    label: 'Demo / Scoping',
    dot: 'bg-purple-400',
  },
  {
    key: 'technical_validation',
    label: 'Tech Validation',
    dot: 'bg-amber-400',
  },
  {
    key: 'proposal',
    label: 'Proposal & Legal',
    dot: 'bg-orange-400',
  },
  {
    key: 'closing',
    label: 'Closing Review',
    dot: 'bg-cyan-400',
  },
  {
    key: 'closed_won',
    label: 'Closed Won',
    dot: 'bg-emerald-400',
  },
];

export const DealsBoard: React.FC<DealsBoardProps> = ({
  deals,
  currency,
  onAdvanceDealStage,
  onMarkDealWon,
  onSelectDeal,
}) => {
  const [viewMode, setViewMode] = useState<
    'kanban' | 'table'
  >('kanban');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [selectedRegion, setSelectedRegion] =
    useState<string>('all');

  const [selectedStage, setSelectedStage] =
    useState<string>('all');

  const [sortField, setSortField] = useState<
    'value' | 'closeDate' | 'probability'
  >('value');

  const [sortAsc, setSortAsc] = useState(false);

  // -----------------------------
  // Filter
  // -----------------------------

  const filteredDeals = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesSearch =
        !query ||
        deal.title
          .toLowerCase()
          .includes(query) ||
        deal.company
          .toLowerCase()
          .includes(query) ||
        deal.repName
          .toLowerCase()
          .includes(query);

      const matchesRegion =
        selectedRegion === 'all' ||
        deal.region === selectedRegion;

      const matchesStage =
        selectedStage === 'all' ||
        deal.stage === selectedStage;

      return (
        matchesSearch &&
        matchesRegion &&
        matchesStage
      );
    });
  }, [
    deals,
    searchQuery,
    selectedRegion,
    selectedStage,
  ]);

  // -----------------------------
  // Sort
  // -----------------------------

  const sortedDeals = useMemo(() => {
    return [...filteredDeals].sort(
      (a, b) => {
        let diff = 0;

        if (sortField === 'value') {
          diff = a.value - b.value;
        }

        if (sortField === 'probability') {
          diff =
            a.probability -
            b.probability;
        }

        if (sortField === 'closeDate') {
          diff =
            new Date(
              a.closeDate
            ).getTime() -
            new Date(
              b.closeDate
            ).getTime();
        }

        return sortAsc ? diff : -diff;
      }
    );
  }, [
    filteredDeals,
    sortField,
    sortAsc,
  ]);

  // -----------------------------
  // Sort handler
  // -----------------------------

  const handleSort = (
    field:
      | 'value'
      | 'closeDate'
      | 'probability'
  ) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // -----------------------------
  // Celebrate & mark won
  // -----------------------------

  const handleCelebrateWin = (
    dealId: string
  ) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6,
      },
    });

    onMarkDealWon(dealId);
  };

  // -----------------------------
  // Reset filters
  // -----------------------------

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedRegion !== 'all' ||
    selectedStage !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedStage('all');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-3 border-b border-slate-800">

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-white tracking-tight">
              Active Deal Pipeline
            </h2>

            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {filteredDeals.length} Results
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">
            Manage opportunities, track stages, and update deal outcomes.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search deals, companies or reps..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56 sm:w-64"
            />
          </div>

          {/* Region */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs">
            <span className="text-slate-500 text-[10px] mr-1.5">
              Region
            </span>

            <select
              value={selectedRegion}
              onChange={(e) =>
                setSelectedRegion(
                  e.target.value
                )
              }
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option
                value="all"
                className="bg-slate-900"
              >
                All Regions
              </option>

              <option
                value="North America"
                className="bg-slate-900"
              >
                North America
              </option>

              <option
                value="EMEA"
                className="bg-slate-900"
              >
                EMEA
              </option>

              <option
                value="APAC"
                className="bg-slate-900"
              >
                APAC
              </option>

              <option
                value="LATAM"
                className="bg-slate-900"
              >
                LATAM
              </option>
            </select>
          </div>

          {/* Stage */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs">
            <span className="text-slate-500 text-[10px] mr-1.5">
              Stage
            </span>

            <select
              value={selectedStage}
              onChange={(e) =>
                setSelectedStage(
                  e.target.value
                )
              }
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option
                value="all"
                className="bg-slate-900"
              >
                All Stages
              </option>

              {STAGES.map((stage) => (
                <option
                  key={stage.key}
                  value={stage.key}
                  className="bg-slate-900"
                >
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-white px-2 py-1.5 transition-colors"
            >
              Clear
            </button>
          )}

          {/* View mode */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() =>
                setViewMode('kanban')
              }
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              Pipeline
            </button>

            <button
              onClick={() =>
                setViewMode('table')
              }
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* KANBAN */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-3 min-w-[900px]">

            {STAGES.map((stage) => {
              const stageDeals =
                sortedDeals.filter(
                  (deal) =>
                    deal.stage ===
                    stage.key
                );

              const stageTotal =
                stageDeals.reduce(
                  (sum, deal) =>
                    sum + deal.value,
                  0
                );

              return (
                <div
                  key={stage.key}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col min-h-[260px]"
                >
                  {/* Stage header */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800/60">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${stage.dot}`}
                      />

                      <span className="text-xs font-bold text-slate-200 truncate">
                        {stage.label}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {stageDeals.length}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mb-2.5">
                    {formatCurrency(
                      stageTotal,
                      currency,
                      true
                    )}
                  </div>

                  {/* Deals */}
                  <div className="space-y-2.5 flex-1">
                    {stageDeals.length === 0 ? (
                      <div className="text-center py-7 text-slate-600 text-xs italic border border-dashed border-slate-800/60 rounded-lg">
                        No deals
                      </div>
                    ) : (
                      stageDeals.map(
                        (deal) => {
                          const priority =
                            getPriorityBadge(
                              deal.priority
                            );

                          return (
                            <div
                              key={deal.id}
                              onClick={() =>
                                onSelectDeal(
                                  deal
                                )
                              }
                              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/30 rounded-lg p-3 transition-all hover:shadow-md group space-y-2 cursor-pointer"
                            >

                              {/* Title */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-semibold text-xs text-white leading-snug line-clamp-2">
                                  {deal.title}
                                </div>

                                <span
                                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border shrink-0 ${priority.bg}`}
                                >
                                  {priority.text}
                                </span>
                              </div>

                              {/* Company */}
                              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Building className="w-3 h-3 text-slate-500 shrink-0" />

                                <span className="truncate">
                                  {deal.company}
                                </span>
                              </div>

                              {/* Value */}
                              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                                <span className="font-bold text-white font-mono text-xs">
                                  {formatCurrency(
                                    deal.value,
                                    currency
                                  )}
                                </span>

                                <span className="text-[11px] font-mono text-indigo-400">
                                  {deal.probability}%
                                </span>
                              </div>

                              {/* Rep + date */}
                              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <img
                                    src={deal.repAvatar}
                                    alt={deal.repName}
                                    className="w-4 h-4 rounded-full object-cover border border-slate-700 shrink-0"
                                  />

                                  <span className="truncate max-w-[85px]">
                                    {deal.repName.split(
                                      ' '
                                    )[0]}
                                  </span>
                                </div>

                                <span className="font-mono text-slate-500">
                                  {deal.closeDate.slice(
                                    5
                                  )}
                                </span>
                              </div>

                              {/* Actions */}
                              <div
                                className="pt-1 flex items-center justify-between gap-1"
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >
                                {deal.stage !==
                                  'closed_won' && (
                                  <>
                                    <button
                                      onClick={() =>
                                        onAdvanceDealStage(
                                          deal.id
                                        )
                                      }
                                      className="flex-1 text-[11px] font-medium py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
                                    >
                                      Advance
                                      <ChevronRight className="w-3 h-3" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleCelebrateWin(
                                          deal.id
                                        )
                                      }
                                      className="text-[11px] font-medium py-1.5 px-2 rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1 transition-colors"
                                    >
                                      <Trophy className="w-3 h-3" />
                                      Won
                                    </button>
                                  </>
                                )}

                                {deal.stage ===
                                  'closed_won' && (
                                  <div className="w-full text-center text-[11px] font-medium py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Revenue Secured
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABLE */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[1000px] text-left text-xs text-slate-300">

            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">
                  Deal & Company
                </th>

                <th
                  className="py-3 px-4 cursor-pointer hover:text-white"
                  onClick={() =>
                    handleSort('value')
                  }
                >
                  <div className="flex items-center gap-1">
                    Value
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th className="py-3 px-4">
                  Stage
                </th>

                <th
                  className="py-3 px-4 cursor-pointer hover:text-white"
                  onClick={() =>
                    handleSort(
                      'probability'
                    )
                  }
                >
                  <div className="flex items-center gap-1">
                    Probability
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th className="py-3 px-4">
                  Owner
                </th>

                <th className="py-3 px-4">
                  Region
                </th>

                <th
                  className="py-3 px-4 cursor-pointer hover:text-white"
                  onClick={() =>
                    handleSort(
                      'closeDate'
                    )
                  }
                >
                  <div className="flex items-center gap-1">
                    Target Date
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th className="py-3 px-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 bg-slate-900/50">
              {sortedDeals.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center"
                  >
                    <div className="text-slate-500 text-sm">
                      No matching deals found.
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={
                          clearFilters
                        }
                        className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                sortedDeals.map(
                  (deal) => {
                    const stageColor =
                      getStageColor(
                        deal.stage
                      );

                    return (
                      <tr
                        key={deal.id}
                        className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                        onClick={() =>
                          onSelectDeal(
                            deal
                          )
                        }
                      >
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">
                            {deal.title}
                          </div>

                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-500" />
                            {deal.company}
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-white text-sm">
                          {formatCurrency(
                            deal.value,
                            currency
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${stageColor.bg} ${stageColor.text} ${stageColor.border}`}
                          >
                            {stageColor.label}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-indigo-500 h-full rounded-full"
                                style={{
                                  width: `${deal.probability}%`,
                                }}
                              />
                            </div>

                            <span className="font-mono text-[11px] text-slate-300">
                              {deal.probability}%
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={deal.repAvatar}
                              alt={deal.repName}
                              className="w-5 h-5 rounded-full object-cover border border-slate-700"
                            />

                            <span className="font-medium text-slate-200">
                              {deal.repName}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {deal.region}
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-400">
                          {deal.closeDate}
                        </td>

                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          {deal.stage !==
                          'closed_won' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  onAdvanceDealStage(
                                    deal.id
                                  )
                                }
                                className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                              >
                                Advance
                              </button>

                              <button
                                onClick={() =>
                                  handleCelebrateWin(
                                    deal.id
                                  )
                                }
                                className="px-2 py-1.5 rounded bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium transition-colors flex items-center gap-1"
                              >
                                <Trophy className="w-3 h-3" />
                                Won
                              </button>
                            </div>
                          ) : (
                            <span className="text-emerald-400 font-mono text-[11px] font-semibold flex items-center justify-end gap-1">
                              <Sparkles className="w-3 h-3" />
                              Won
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
