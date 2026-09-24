import React, { useState } from 'react';
import { Calculator, CheckCircle2, MapPin, Truck, Sparkles, Send } from 'lucide-react';
import { FINISH_OPTIONS } from '../data/products';
import { FinishType } from '../types';
import confetti from 'canvas-confetti';

export const QuoteEstimator: React.FC = () => {
  const [roomType, setRoomType] = useState<'bedroom' | 'living' | 'kitchen' | 'wardrobe'>('bedroom');
  const [runningFeet, setRunningFeet] = useState<number>(14);
  const [selectedFinish, setSelectedFinish] = useState<FinishType>('charcoal');
  const [city, setCity] = useState<string>('Karachi');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Pricing formula based on aluminum extrusion rate per running foot / unit in Pakistan
  const baseRates: Record<string, number> = {
    bedroom: 2400, // per foot includes bed base + accents
    living: 2200,  // per foot diwan frame + seating
    kitchen: 2900, // washable damp-proof kitchen carcass
    wardrobe: 3200 // 84" high sliding wardrobe frame
  };

  const finishMultipliers: Record<FinishType, number> = {
    charcoal: 1.0,
    natural: 0.95,
    walnut: 1.15, // sublimated woodgrain requires heat transfer film
    bronze: 1.08
  };

  const calculatedBase = Math.round(runningFeet * (baseRates[roomType] || 2500) * (finishMultipliers[selectedFinish] || 1));
  const freeDelivery = calculatedBase >= 40000;
  const deliveryCharge = freeDelivery ? 0 : 2500;
  const estimatedTotalPKR = calculatedBase + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="estimator" className="py-20 border-b border-white/[0.08] bg-[#0c0e12]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-amber-400 tracking-wider">
            INTERACTIVE CAD &amp; PRICING CALCULATOR
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Custom Aluminum Room Quotation
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Calculate estimated factory costs for your custom room dimensions anywhere in Pakistan.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#14171f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h3 className="font-display text-2xl font-bold text-white">Quotation Request Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-semibold">{customerName}</span>. 
                Our design engineering team will reach out via WhatsApp at <span className="font-mono text-white">{phone}</span> with your 3D CAD drawings and confirmed quote for {city}.
              </p>
              <div className="p-4 bg-white/[0.04] rounded-xl max-w-md mx-auto text-left font-mono text-xs space-y-1 text-slate-300">
                <div>Room Type: <span className="text-white capitalize">{roomType}</span></div>
                <div>Size: <span className="text-white">{runningFeet} Running Feet</span></div>
                <div>Finish: <span className="text-white capitalize">{selectedFinish}</span></div>
                <div>Estimated Total: <span className="text-amber-400 font-bold">PKR {estimatedTotalPKR.toLocaleString()}</span></div>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Calculate Another Room
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Room Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  1. Select Interior Space:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'bedroom', label: 'Bedroom Suite', desc: 'Bed frame & side units' },
                    { id: 'living', label: 'Majlis Lounge', desc: 'Diwan & sofa frames' },
                    { id: 'kitchen', label: 'Kitchen Island', desc: 'Damp-proof carcass' },
                    { id: 'wardrobe', label: 'AeroSlide Closet', desc: 'Fluted glass wardrobe' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRoomType(item.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        roomType === item.id
                          ? 'border-amber-400 bg-amber-400/[0.08] shadow-sm'
                          : 'border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Dimensions Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    2. Approximate Length / Running Feet:
                  </label>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {runningFeet} Feet (~{(runningFeet * 0.3048).toFixed(1)} meters)
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="30"
                  step="1"
                  value={runningFeet}
                  onChange={(e) => setRunningFeet(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>Compact (6 ft)</span>
                  <span>Standard (14 ft)</span>
                  <span>Grand Suite (30 ft)</span>
                </div>
              </div>

              {/* Step 3: Finish Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  3. Select Alloy Finish &amp; Texture:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FINISH_OPTIONS.map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        selectedFinish === f.id
                          ? 'border-amber-400 bg-amber-400/[0.08]'
                          : 'border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: f.hex }}
                      />
                      <div className="text-xs font-medium text-white truncate">{f.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: City Selection & Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Delivery City:
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Karachi">Karachi (Sindh)</option>
                    <option value="Lahore">Lahore (Punjab)</option>
                    <option value="Islamabad">Islamabad (Federal)</option>
                    <option value="Rawalpindi">Rawalpindi (Punjab)</option>
                    <option value="Faisalabad">Faisalabad (Punjab)</option>
                    <option value="Peshawar">Peshawar (KPK)</option>
                    <option value="Multan">Multan (Punjab)</option>
                    <option value="Quetta">Quetta (Balochistan)</option>
                    <option value="Sialkot">Sialkot (Punjab)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asna / Ayaz"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    WhatsApp / Phone:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/[0.06] to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs text-slate-400 font-mono">
                    ESTIMATED FACTORY COST (ALLOY 6063-T6)
                  </div>
                  <div className="font-display text-3xl font-bold text-white font-mono tabular-nums">
                    PKR {estimatedTotalPKR.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{freeDelivery ? 'Free doorstep delivery across Pakistan' : 'Standard Delivery: PKR 2,500'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official CAD &amp; Quote</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
