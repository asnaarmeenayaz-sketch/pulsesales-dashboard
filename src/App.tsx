/**
 * PulseSales — Executive Sales & Performance Dashboard
 * Executive sales intelligence dashboard
 */

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Deal,
  SalesRep,
  MonthlyRevenueData,
  ActivityEvent,
  SalesDashboardMetrics,
  CurrencyConfig,
  DealStage,
} from './types/sales';

import {
  CURRENCIES,
  INITIAL_DEALS,
  INITIAL_SALES_REPS,
  INITIAL_METRICS,
  MONTHLY_REVENUE_HISTORY,
  INITIAL_ACTIVITY_STREAM,
} from './data/initialData';

import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { RevenueChart } from './components/RevenueChart';
import { PipelineFunnel } from './components/PipelineFunnel';
import { DealsBoard } from './components/DealsBoard';
import { TeamLeaderboard } from './components/TeamLeaderboard';
import { RegionalAttribution } from './components/RegionalAttribution';
import { LiveActivityFeed } from './components/LiveActivityFeed';
import { NewDealModal } from './components/NewDealModal';

import {
  exportDealsToCSV,
  exportSummaryToJSON,
} from './services/exportService';

import {
  LayoutDashboard,
  Kanban,
  Users,
  PieChart,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  // -----------------------------
  // State
  // -----------------------------

  const [deals, setDeals] =
    useState<Deal[]>(INITIAL_DEALS);

  const [reps, setReps] =
    useState<SalesRep[]>(INITIAL_SALES_REPS);

  const [metrics, setMetrics] =
    useState<SalesDashboardMetrics>(
      INITIAL_METRICS
    );

  const [revenueHistory] =
    useState<MonthlyRevenueData[]>(
      MONTHLY_REVENUE_HISTORY
    );

  const [activities, setActivities] =
    useState<ActivityEvent[]>(
      INITIAL_ACTIVITY_STREAM
    );

  const [currency, setCurrency] =
    useState<CurrencyConfig>(
      CURRENCIES.USD
    );

  const [selectedRange, setSelectedRange] =
    useState('Q3 2026');

  const [activeTab, setActiveTab] =
    useState<
      'overview' |
      'deals' |
      'leaderboard' |
      'attribution'
    >('overview');

  const [isSimulating, setIsSimulating] =
    useState(true);

  const [isNewDealModalOpen, setIsNewDealModalOpen] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState<string | null>(null);

  // -----------------------------
  // Constants
  // -----------------------------

  const BASE_ARR = 4_500_000;

  const stageOrder: DealStage[] = [
    'discovery',
    'qualification',
    'demo',
    'technical_validation',
    'proposal',
    'closing',
    'closed_won',
  ];

  // -----------------------------
  // Toast
  // -----------------------------

  const showToast = useCallback((message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // -----------------------------
  // Recalculate Metrics
  // -----------------------------

  const recalculateMetrics = useCallback(
    (
      updatedDeals: Deal[],
      updatedReps: SalesRep[]
    ) => {
      const openDeals = updatedDeals.filter(
        (deal) =>
          deal.stage !== 'closed_won' &&
          deal.stage !== 'closed_lost'
      );

      const totalPipeline = openDeals.reduce(
        (sum, deal) =>
          sum + deal.value,
        0
      );

      const weightedPipeline = openDeals.reduce(
        (sum, deal) =>
          sum +
          (deal.value * deal.probability) /
            100,
        0
      );

      const wonDeals = updatedDeals.filter(
        (deal) =>
          deal.stage === 'closed_won'
      );

      const wonTotal = wonDeals.reduce(
        (sum, deal) =>
          sum + deal.value,
        0
      );

      const totalTarget = updatedReps.reduce(
        (sum, rep) =>
          sum + rep.quota,
        0
      );

      const totalClosed = updatedReps.reduce(
        (sum, rep) =>
          sum + rep.closedRevenue,
        0
      );

      const attainment =
        totalTarget > 0
          ? (totalClosed /
              totalTarget) *
            100
          : 0;

      const totalARR =
        BASE_ARR + wonTotal;

      setMetrics((prev) => ({
        ...prev,
        pipelineValue:
          totalPipeline,
        weightedPipeline:
          Math.round(
            weightedPipeline
          ),
        totalARR,
        totalMRR:
          Math.round(
            totalARR / 12
          ),
        quarterAttainment:
          Math.round(
            attainment * 10
          ) / 10,
        dealsClosedThisQuarter:
          wonDeals.length,
        activeOpportunities:
          openDeals.length,
      }));
    },
    []
  );

  // Always keep KPI cards synced with current data
  useEffect(() => {
    recalculateMetrics(
      deals,
      reps
    );
  }, [
    deals,
    reps,
    recalculateMetrics,
  ]);

  // -----------------------------
  // Mark Deal as Won
  // -----------------------------

  const handleMarkDealWon =
    useCallback(
      (dealId: string) => {
        const targetDeal =
          deals.find(
            (deal) =>
              deal.id === dealId
          );

        if (!targetDeal) {
          return;
        }

        if (
          targetDeal.stage ===
          'closed_won'
        ) {
          return;
        }

        const updatedDeals =
          deals.map((deal) => {
            if (
              deal.id !== dealId
            ) {
              return deal;
            }

            return {
              ...deal,
              stage:
                'closed_won' as DealStage,
              probability: 100,
              lastContact:
                'Closed Won',
            };
          });

        const updatedReps =
          reps.map((rep) => {
            if (
              rep.id !==
              targetDeal.repId
            ) {
              return rep;
            }

            return {
              ...rep,
              closedRevenue:
                rep.closedRevenue +
                targetDeal.value,
              dealsWonCount:
                rep.dealsWonCount +
                1,
              commissionEarned:
                Math.round(
                  rep.commissionEarned +
                    targetDeal.value *
                      0.08
                ),
            };
          });

        setDeals(updatedDeals);
        setReps(updatedReps);

        setActivities((prev) => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            repName:
              targetDeal.repName,
            repAvatar:
              targetDeal.repAvatar,
            type: 'deal_won',
            description:
              `Signed & closed ${targetDeal.title}`,
            companyName:
              targetDeal.company,
            amount:
              targetDeal.value,
          },
          ...prev,
        ]);

        showToast(
          `🎉 Closed Won: ${targetDeal.company} ($${targetDeal.value.toLocaleString()})!`
        );
      },
      [deals, reps, showToast]
    );

  // -----------------------------
  // Advance Deal Stage
  // -----------------------------

  const handleAdvanceDealStage =
    useCallback(
      (dealId: string) => {
        const targetDeal =
          deals.find(
            (deal) =>
              deal.id === dealId
          );

        if (!targetDeal) {
          return;
        }

        // Closing -> Closed Won
        if (
          targetDeal.stage ===
          'closing'
        ) {
          handleMarkDealWon(
            dealId
          );
          return;
        }

        setDeals((prevDeals) =>
          prevDeals.map((deal) => {
            if (
              deal.id !== dealId
            ) {
              return deal;
            }

            const currentIndex =
              stageOrder.indexOf(
                deal.stage
              );

            const nextStage =
              currentIndex <
              stageOrder.length - 1
                ? stageOrder[
                    currentIndex + 1
                  ]
                : deal.stage;

            const nextProbability =
              Math.min(
                100,
                deal.probability +
                  15
              );

            setActivities((prev) => [
              {
                id: `act-${Date.now()}`,
                timestamp:
                  'Just now',
                repName:
                  deal.repName,
                repAvatar:
                  deal.repAvatar,
                type:
                  'deal_advanced',
                description:
                  `Advanced "${deal.title}" to ${nextStage
                    .replace(
                      '_',
                      ' '
                    )
                    .toUpperCase()}`,
                companyName:
                  deal.company,
                amount:
                  deal.value,
              },
              ...prev,
            ]);

            showToast(
              `Advanced ${deal.company} to ${nextStage.replace(
                '_',
                ' '
              )}`
            );

            return {
              ...deal,
              stage: nextStage,
              probability:
                nextProbability,
            };
          })
        );
      },
      [
        deals,
        handleMarkDealWon,
        showToast,
      ]
    );

  // -----------------------------
  // Add New Deal
  // -----------------------------

  const handleAddDeal =
    useCallback(
      (newDeal: Deal) => {
        setDeals((prev) => [
          newDeal,
          ...prev,
        ]);

        setActivities((prev) => [
          {
            id: `act-${Date.now()}`,
            timestamp:
              'Just now',
            repName:
              newDeal.repName,
            repAvatar:
              newDeal.repAvatar,
            type:
              'deal_advanced',
            description:
              `Logged new opportunity "${newDeal.title}"`,
            companyName:
              newDeal.company,
            amount:
              newDeal.value,
          },
          ...prev,
        ]);

        showToast(
          `Added new deal for ${newDeal.company}`
        );
      },
      [showToast]
    );

  // -----------------------------
  // Simulate Activity
  // -----------------------------

  const handleSimulateTick =
    useCallback(() => {
      if (reps.length === 0) {
        return;
      }

      const randomRep =
        reps[
          Math.floor(
            Math.random() *
              reps.length
          )
        ];

      const sampleCompanies = [
        'Stripe Logistics Inc',
        'Nordic Health Systems',
        'Palantir Data Solutions',
        'AeroTech Zurich',
        'Quantum FinServices',
        'CyberScale Labs',
      ];

      const company =
        sampleCompanies[
          Math.floor(
            Math.random() *
              sampleCompanies.length
          )
        ];

      const amount = Math.floor(
        65000 +
          Math.random() *
            220000
      );

      const eventTypes: ActivityEvent['type'][] =
        [
          'deal_advanced',
          'meeting_completed',
          'proposal_sent',
          'call_logged',
        ];

      const type =
        eventTypes[
          Math.floor(
            Math.random() *
              eventTypes.length
          )
        ];

      const descriptions = {
        deal_advanced:
          'Completed technical demo & advanced pipeline',

        meeting_completed:
          'Executive pricing meeting completed',

        proposal_sent:
          'Sent enterprise proposal and commercial terms',

        call_logged:
          'Completed strategic account call',

        deal_won:
          'Contract finalized and signed',
      };

      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          timestamp:
            'Just now',
          repName:
            randomRep.name,
          repAvatar:
            randomRep.avatar,
          type,
          description:
            descriptions[type],
          companyName:
            company,
          amount,
        },
        ...prev.slice(0, 24),
      ]);

      showToast(
        `⚡ Live event: ${randomRep.name} with ${company}`
      );
    }, [reps, showToast]);

  // -----------------------------
  // Auto Simulation
  // -----------------------------

  useEffect(() => {
    if (!isSimulating) {
      return;
    }

    const interval = setInterval(
      () => {
        handleSimulateTick();
      },
      14000
    );

    return () =>
      clearInterval(
        interval
      );
  }, [
    isSimulating,
    handleSimulateTick,
  ]);

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentCurrency={
          currency
        }
        onCurrencyChange={
          setCurrency
        }
        selectedRange={
          selectedRange
        }
        onRangeChange={
          setSelectedRange
        }
        isSimulating={
          isSimulating
        }
        onToggleSimulation={() =>
          setIsSimulating(
            (prev) => !prev
          )
        }
        onOpenNewDealModal={() =>
          setIsNewDealModalOpen(
            true
          )
        }
        onExportCSV={() =>
          exportDealsToCSV(
            deals
          )
        }
        onExportJSON={() =>
          exportSummaryToJSON(
            metrics,
            deals,
            reps
          )
        }
        totalDealsCount={
          deals.length
        }
      />

      {/* Navigation */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto py-2">
          <div className="flex items-center gap-1 sm:gap-2">

            {[
              {
                id: 'overview',
                label:
                  'Executive Overview',
                icon:
                  LayoutDashboard,
              },
              {
                id: 'deals',
                label:
                  'Pipeline & Deals',
                icon:
                  Kanban,
              },
              {
                id: 'leaderboard',
                label:
                  'Team Leaderboard',
                icon:
                  Users,
              },
              {
                id: 'attribution',
                label:
                  'Geography & Sources',
                icon:
                  PieChart,
              },
            ].map((tab) => {
              const Icon =
                tab.icon;

              const isActive =
                activeTab ===
                tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as
                        | 'overview'
                        | 'deals'
                        | 'leaderboard'
                        | 'attribution'
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>
                    {tab.label}
                  </span>
                </button>
              );
            })}

          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">

        <MetricsOverview
          metrics={metrics}
          currency={currency}
        />

        {/* Overview */}
        {activeTab ===
          'overview' && (
          <div className="space-y-6">

            <RevenueChart
              data={revenueHistory}
              currency={currency}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PipelineFunnel
                  deals={deals}
                  currency={currency}
                />
              </div>

              <div>
                <LiveActivityFeed
                  activities={
                    activities
                  }
                  currency={
                    currency
                  }
                  isSimulating={
                    isSimulating
                  }
                  onSimulateTick={
                    handleSimulateTick
                  }
                />
              </div>
            </div>

            <DealsBoard
              deals={deals}
              currency={currency}
              onAdvanceDealStage={
                handleAdvanceDealStage
              }
              onMarkDealWon={
                handleMarkDealWon
              }
              onSelectDeal={() => {}}
            />

            <RegionalAttribution
              deals={deals}
              currency={currency}
            />
          </div>
        )}

        {/* Deals */}
        {activeTab ===
          'deals' && (
          <div className="space-y-6">

            <DealsBoard
              deals={deals}
              currency={currency}
              onAdvanceDealStage={
                handleAdvanceDealStage
              }
              onMarkDealWon={
                handleMarkDealWon
              }
              onSelectDeal={() => {}}
            />

            <PipelineFunnel
              deals={deals}
              currency={currency}
            />
          </div>
        )}

        {/* Leaderboard */}
        {activeTab ===
          'leaderboard' && (
          <div>
            <TeamLeaderboard
              reps={reps}
              currency={currency}
            />
          </div>
        )}

        {/* Attribution */}
        {activeTab ===
          'attribution' && (
          <div className="space-y-6">

            <RegionalAttribution
              deals={deals}
              currency={currency}
            />

            <PipelineFunnel
              deals={deals}
              currency={currency}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />

            <span className="font-semibold text-slate-400">
              PulseSales Executive Intelligence
            </span>

            <span>
              • Sales Performance Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() =>
                exportDealsToCSV(
                  deals
                )
              }
              className="hover:text-emerald-300 transition-colors"
            >
              Export CSV
            </button>

            <span>•</span>

            <button
              onClick={() =>
                exportSummaryToJSON(
                  metrics,
                  deals,
                  reps
                )
              }
              className="hover:text-indigo-300 transition-colors"
            >
              Snapshot JSON
            </button>
          </div>
        </div>
      </footer>

      {/* New Deal Modal */}
      <NewDealModal
        isOpen={
          isNewDealModalOpen
        }
        onClose={() =>
          setIsNewDealModalOpen(
            false
          )
        }
        onAddDeal={
          handleAddDeal
        }
        reps={reps}
      />

    </div>
  );
}