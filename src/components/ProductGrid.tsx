import React, { useState } from 'react';
import { Product, Category, FinishType } from '../types';
import { PRODUCTS } from '../data/products';
import { ShieldCheck, Droplets, Eye, Plus } from 'lucide-react';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onSelectProduct,
  onQuickAdd
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Furniture' },
    { id: 'beds', label: 'Bedroom Suites' },
    { id: 'living', label: 'Living & Diwans' },
    { id: 'wardrobes', label: 'Wardrobes & Closets' },
    { id: 'kitchens', label: 'Kitchen Cabinetry' },
    { id: 'tables', label: 'Tables & Dining' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="collection" className="py-20 border-b border-white/[0.08]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-wider">
              100% TERMITE IMMUNE · PURE HOUSEHOLD ALUMINUM
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              The AlumiCraft Signature Collection
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Engineered with architectural aluminum alloys, acoustic damping, and powder-coated satin finishes.
            </p>
          </div>

          {/* Interactive Filter Tabs (functional segmented buttons) */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#14171f] border border-white/[0.08] rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-[#14171f] border border-white/[0.08] hover:border-white/[0.2] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Image Container (65-70% visual focus) */}
              <div 
                className="relative aspect-[4/3] bg-[#0f1115] overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Scrim and Quick Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between">
                  <span className="text-xs text-white font-medium flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Inspect</span>
                  </span>
                  <span className="text-xs text-amber-400 font-mono">
                    {product.alloyGrade}
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <div className="bg-[#0f1115]/90 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1 backdrop-blur-sm">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Termite Proof</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <div className="bg-[#0f1115]/90 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 backdrop-blur-sm">
                    {product.weightKg} kg
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {product.category} · {product.alloyGrade}
                  </div>
                  
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-display text-lg font-bold text-white mt-1 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Price and Action Bar */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Factory Direct</div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-lg font-bold text-white tabular-nums">
                        PKR {product.pricePKR.toLocaleString()}
                      </span>
                      {product.originalPricePKR && (
                        <span className="font-mono text-xs text-slate-500 line-through">
                          PKR {product.originalPricePKR.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors cursor-pointer"
                    >
                      Specs
                    </button>
                    <button
                      onClick={() => onQuickAdd(product)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
