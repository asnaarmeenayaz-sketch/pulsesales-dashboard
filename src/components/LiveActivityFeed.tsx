import React from 'react';
import { ActivityEvent, CurrencyConfig } from '../types/sales';
import { formatCurrency } from '../utils/formatters';
import { 
  Trophy, 
  ArrowRight, 
  PhoneCall, 
  Send, 
  Users, 
  Radio, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface LiveActivityFeedProps {
  activities: ActivityEvent[];
  currency: CurrencyConfig;
  isSimulating: boolean;
  onSimulateTick: () => void;
}

export const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({
  activities,
  currency,
  isSimulating,
  onSimulateTick,
}) => {
  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'deal_won':
        return <Trophy className="w-3.5 h-3.5 text-emerald-400" />;
      case 'deal_advanced':
        return <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />;
      case 'proposal_sent':
        return <Send className="w-3.5 h-3.5 text-blue-400" />;
      case 'meeting_completed':
        return <Users className="w-3.5 h-3.5 text-purple-400" />;
      case 'call_logged':
        return <PhoneCall className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className={`w-4 h-4 ${isSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Live Activity Stream</h3>
            <p className="text-[11px] text-slate-400">Real-time team deal velocity and milestones</p>
          </div>
        </div>

        <button
          onClick={onSimulateTick}
          className="text-[11px] font-medium px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-white border border-slate-700/60 transition-colors"
          title="Trigger a simulated sales event immediately"
        >
          + Simulate Event
        </button>
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
          >
            {/* Rep Avatar */}
            <img
              src={act.repAvatar}
              alt={act.repName}
              className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0 mt-0.5"
            />

            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between gap-1">
                <span className="font-semibold text-white truncate">{act.repName}</span>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.timestamp}</span>
              </div>

              <p className="text-slate-300 mt-0.5 leading-snug">{act.description}</p>

              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-400 truncate max-w-[140px]">
                  {act.companyName}
                </span>

                {act.amount && (
                  <span className="font-mono font-bold text-emerald-400">
                    {formatCurrency(act.amount, currency)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
