import React, { useState } from 'react';
import { Deal, SalesRep, Region, MarketSegment, LeadSource, DealPriority, DealStage } from '../types/sales';
import { X, DollarSign, Building, Sparkles, User, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeal: (deal: Deal) => void;
  reps: SalesRep[];
}

export const NewDealModal: React.FC<NewDealModalProps> = ({
  isOpen,
  onClose,
  onAddDeal,
  reps,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [value, setValue] = useState<number>(120000);
  const [stage, setStage] = useState<DealStage>('discovery');
  const [repId, setRepId] = useState(reps[0]?.id || 'rep-1');
  const [probability, setProbability] = useState<number>(50);
  const [closeDate, setCloseDate] = useState('2026-11-15');
  const [region, setRegion] = useState<Region>('North America');
  const [segment, setSegment] = useState<MarketSegment>('Enterprise');
  const [source, setSource] = useState<LeadSource>('Inbound Lead');
  const [priority, setPriority] = useState<DealPriority>('high');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || value <= 0) return;

    const selectedRep = reps.find((r) => r.id === repId) || reps[0];

    const newDeal: Deal = {
      id: `DEAL-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      company,
      value: Number(value),
      stage,
      repId: selectedRep.id,
      repName: selectedRep.name,
      repAvatar: selectedRep.avatar,
      probability: Number(probability),
      closeDate,
      region,
      segment,
      source,
      priority,
      lastContact: 'Just created',
      products: ['Enterprise Cloud Core', 'Custom SLA 24/7'],
      notes,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddDeal(newDeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Opportunity</h2>
              <p className="text-xs text-slate-400">Add an enterprise deal to the active sales pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Deal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., Global Cloud Core Migration"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company / Account *</label>
              <input
                type="text"
                required
                placeholder="e.g., Horizon Financial Tech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Deal Value (USD) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pipeline Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as DealStage)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="discovery">1. Discovery</option>
                <option value="qualification">2. Qualification</option>
                <option value="demo">3. Demo & Scoping</option>
                <option value="technical_validation">4. Tech Validation</option>
                <option value="proposal">5. Proposal & Legal</option>
                <option value="closing">6. Closing Review</option>
                <option value="closed_won">7. Closed Won</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Win Probability (%)</label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={probability}
                onChange={(e) => setProbability(Number(e.target.value))}
                className="w-full mt-2 accent-indigo-500 cursor-pointer"
              />
              <div className="text-right font-mono text-indigo-400 font-bold">{probability}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Assigned Sales Rep</label>
              <select
                value={repId}
                onChange={(e) => setRepId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {reps.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Close Date</label>
              <input
                type="date"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as DealPriority)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="critical">Critical (Tier 1)</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="North America">North America</option>
                <option value="EMEA">EMEA</option>
                <option value="APAC">APAC</option>
                <option value="LATAM">LATAM</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Market Segment</label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value as MarketSegment)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="SMB">SMB</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as LeadSource)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Inbound Lead">Inbound Lead</option>
                <option value="Outbound SDR">Outbound SDR</option>
                <option value="Executive Referral">Executive Referral</option>
                <option value="Partner Ecosystem">Partner Ecosystem</option>
                <option value="Product Led Growth">Product Led Growth</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Executive Notes & Strategy</label>
            <textarea
              rows={2}
              placeholder="e.g. Budget pre-approved. Key decision maker is VP of Infrastructure..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Create Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
