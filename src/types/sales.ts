export type DealStage = 
  | 'discovery'
  | 'qualification'
  | 'demo'
  | 'technical_validation'
  | 'proposal'
  | 'closing'
  | 'closed_won'
  | 'closed_lost';

export type DealPriority = 'critical' | 'high' | 'medium' | 'low';

export type Region = 'North America' | 'EMEA' | 'APAC' | 'LATAM';

export type MarketSegment = 'Enterprise' | 'Mid-Market' | 'SMB';

export type LeadSource = 'Inbound Lead' | 'Outbound SDR' | 'Executive Referral' | 'Partner Ecosystem' | 'Product Led Growth';

export interface Deal {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  value: number; // in USD
  stage: DealStage;
  repId: string;
  repName: string;
  repAvatar: string;
  probability: number; // 0-100
  closeDate: string; // YYYY-MM-DD
  region: Region;
  segment: MarketSegment;
  source: LeadSource;
  priority: DealPriority;
  lastContact: string; // e.g., '2 hours ago'
  products: string[];
  notes?: string;
  createdAt: string;
}

export interface SalesRep {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  region: Region;
  quota: number; // Target in USD
  closedRevenue: number;
  pipelineValue: number;
  dealsWonCount: number;
  dealsActiveCount: number;
  winRate: number; // percentage
  averageDealCycleDays: number;
  commissionEarned: number;
  ranking: number;
  streakMonths: number;
  badges: string[];
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  target: number;
  pipeline: number;
  churn: number;
  newDeals: number;
}

export interface FunnelStageData {
  stage: DealStage;
  label: string;
  count: number;
  value: number;
  conversionRate: number;
  avgDaysInStage: number;
  color: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  repName: string;
  repAvatar: string;
  type: 'deal_won' | 'deal_advanced' | 'meeting_completed' | 'proposal_sent' | 'call_logged';
  description: string;
  amount?: number;
  companyName: string;
}

export interface SalesDashboardMetrics {
  totalARR: number;
  totalMRR: number;
  pipelineValue: number;
  weightedPipeline: number;
  quarterAttainment: number; // percentage e.g. 104.8
  winRate: number; // percentage
  avgDealSize: number;
  cacPaybackMonths: number;
  activeOpportunities: number;
  dealsClosedThisQuarter: number;
  expansionARR: number;
  growthRateYoY: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'PKR' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier relative to USD
}
