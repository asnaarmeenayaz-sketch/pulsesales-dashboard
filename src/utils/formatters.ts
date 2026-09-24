import { CurrencyConfig } from '../types/sales';

export function formatCurrency(amountUSD: number, currency: CurrencyConfig, compact = false): string {
  const converted = amountUSD * currency.rate;

  if (compact) {
    if (Math.abs(converted) >= 1_000_000) {
      return `${currency.symbol}${(converted / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(converted) >= 1_000) {
      return `${currency.symbol}${(converted / 1_000).toFixed(1)}k`;
    }
  }

  return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function getStageColor(stage: string): { bg: string; text: string; border: string; label: string } {
  switch (stage) {
    case 'discovery':
      return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Discovery' };
    case 'qualification':
      return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', label: 'Qualification' };
    case 'demo':
      return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', label: 'Demo' };
    case 'technical_validation':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Tech Validation' };
    case 'proposal':
      return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', label: 'Proposal' };
    case 'closing':
      return { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', label: 'Closing' };
    case 'closed_won':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Closed Won' };
    case 'closed_lost':
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', label: 'Closed Lost' };
    default:
      return { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700', label: stage };
  }
}

export function getPriorityBadge(priority: string): { bg: string; text: string; dot: string } {
  switch (priority) {
    case 'critical':
      return { bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400', text: 'Critical', dot: 'bg-rose-500' };
    case 'high':
      return { bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400', text: 'High', dot: 'bg-amber-500' };
    case 'medium':
      return { bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400', text: 'Medium', dot: 'bg-blue-500' };
    default:
      return { bg: 'bg-slate-800 border-slate-700 text-slate-400', text: 'Low', dot: 'bg-slate-400' };
  }
}
