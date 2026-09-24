import React, { useState } from 'react';
import { X, ShieldCheck, Droplets, Check, ShoppingBag, Ruler, Award } from 'lucide-react';
import { Product, FinishType } from '../types';
import { FINISH_OPTIONS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: FinishType) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<FinishType>('charcoal');

  const handleAdd = () => {
    onAddToCart(product, selectedFinish);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#14171f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Visual & Material Finish Preview */}
          <div className="md:col-span-6 bg-[#0f1115] p-6 flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0f1115]/90 border border-white/10 px-2.5 py-1 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Termite Proof</span>
              </div>
            </div>

            {/* Finish Selector */}
            <div className="mt-6">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Select Architectural Finish:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FINISH_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedFinish === f.id
                        ? 'border-amber-400 bg-amber-400/[0.08]'
                        : 'border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: f.hex }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white truncate">{f.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Proof Badges */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>100% Washable Frame</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{product.warrantyYears} Years Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono text-amber-400 tracking-wider">
                {product.alloyGrade.toUpperCase()}
              </div>
              <h2 className="font-display text-2xl font-bold text-white mt-1">
                {product.name}
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                {product.tagline}
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-white font-mono tabular-nums">
                  PKR {product.pricePKR.toLocaleString()}
                </span>
                {product.originalPricePKR && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    PKR {product.originalPricePKR.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono">
                  Direct Factory Price
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features List */}
              <div className="mt-4 space-y-1.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Engineered Advantages:
                </div>
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Dimensions & Specs Grid */}
              <div className="mt-5 p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="font-mono text-white">{product.dimensions}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Net Weight:</span>
                  <span className="font-mono text-white">{product.weightKg} kg (vs 75kg wood)</span>
                </div>
                {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-medium text-white truncate max-w-[200px] text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order (COD Available)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
