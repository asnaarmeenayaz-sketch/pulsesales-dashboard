import React, { useState } from 'react';

import {
  Download,
  Plus,
  FileSpreadsheet,
  FileCode,
  Globe,
  Radio,
  ChevronDown,
} from 'lucide-react';

import {
  CurrencyConfig,
  CurrencyCode,
} from '../types/sales';

import { CURRENCIES } from '../data/initialData';

interface HeaderProps {
  currentCurrency: CurrencyConfig;
  onCurrencyChange: (
    currency: CurrencyConfig
  ) => void;

  selectedRange: string;
  onRangeChange: (
    range: string
  ) => void;

  isSimulating: boolean;
  onToggleSimulation: () => void;

  onOpenNewDealModal: () => void;

  onExportCSV: () => void;
  onExportJSON: () => void;

  totalDealsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  selectedRange,
  onRangeChange,
  isSimulating,
  onToggleSimulation,
  onOpenNewDealModal,
  onExportCSV,
  onExportJSON,
  totalDealsCount,
}) => {
  const [showExportMenu, setShowExportMenu] =
    useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Branding */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
            P

            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isSimulating
                    ? 'bg-emerald-400'
                    : 'bg-slate-500'
                } opacity-75`}
              />

              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  isSimulating
                    ? 'bg-emerald-500'
                    : 'bg-slate-500'
                }`}
              />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                PulseSales
              </h1>

              <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Sales Intelligence
              </span>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>
                Executive Revenue & Performance Dashboard
              </span>

              <span className="text-slate-700 hidden sm:inline">
                •
              </span>

              <span
                className={`inline-flex items-center gap-1 ${
                  isSimulating
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSimulating
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-slate-500'
                  }`}
                />

                {isSimulating
                  ? 'Live'
                  : 'Paused'}
              </span>

              <span className="text-slate-700">
                •
              </span>

              <span>
                {totalDealsCount} Deals
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Live Feed */}
          <button
            onClick={onToggleSimulation}
            title={
              isSimulating
                ? 'Pause simulated sales activity'
                : 'Start simulated sales activity'
            }
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              isSimulating
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Radio
              className={`w-3.5 h-3.5 ${
                isSimulating
                  ? 'text-emerald-400 animate-pulse'
                  : 'text-slate-500'
              }`}
            />

            <span>
              {isSimulating
                ? 'Live Feed'
                : 'Feed Paused'}
            </span>
          </button>

          {/* Time Range */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            {[
              'Q3 2026',
              'This Month',
              'YTD',
            ].map((range) => (
              <button
                key={range}
                onClick={() =>
                  onRangeChange(range)
                }
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedRange === range
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Currency */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mr-1.5" />

            <select
              value={
                currentCurrency.code
              }
              onChange={(e) => {
                const selected =
                  CURRENCIES[
                    e.target
                      .value as CurrencyCode
                  ];

                if (selected) {
                  onCurrencyChange(
                    selected
                  );
                }
              }}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option
                value="USD"
                className="bg-slate-900 text-white"
              >
                USD ($)
              </option>

              <option
                value="EUR"
                className="bg-slate-900 text-white"
              >
                EUR (€)
              </option>

              <option
                value="GBP"
                className="bg-slate-900 text-white"
              >
                GBP (£)
              </option>

              <option
                value="PKR"
                className="bg-slate-900 text-white"
              >
                PKR (₨)
              </option>

              <option
                value="INR"
                className="bg-slate-900 text-white"
              >
                INR (₹)
              </option>
            </select>
          </div>

          {/* Export */}
          <div className="relative">
            <button
              onClick={() =>
                setShowExportMenu(
                  (prev) => !prev
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />

              <span>
                Export
              </span>

              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showExportMenu && (
              <div
                className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-40"
                onClick={() =>
                  setShowExportMenu(false)
                }
              >
                <button
                  onClick={
                    onExportCSV
                  }
                  className="w-full text-left px-3.5 py-2.5 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />

                  <div>
                    <div className="font-medium">
                      Export Deals
                    </div>

                    <div className="text-[10px] text-slate-400">
                      CSV for Excel / Sheets
                    </div>
                  </div>
                </button>

                <button
                  onClick={
                    onExportJSON
                  }
                  className="w-full text-left px-3.5 py-2.5 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                >
                  <FileCode className="w-4 h-4 text-blue-400 shrink-0" />

                  <div>
                    <div className="font-medium">
                      Executive Snapshot
                    </div>

                    <div className="text-[10px] text-slate-400">
                      JSON metrics & pipeline data
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* New Deal */}
          <button
            onClick={
              onOpenNewDealModal
            }
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />

            <span>
              New Deal
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};