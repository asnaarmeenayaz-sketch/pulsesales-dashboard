import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  Download, 
  Users, 
  BarChart3, 
  Printer, 
  Figma,
  Maximize2
} from 'lucide-react';
import { SLIDES, PRESENTATION_PRESENTERS } from '../data/slides';
import { generateFigmaSlideDeckSvg, downloadSingleFile } from '../data/figmaData';

interface PresentationDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFigma: () => void;
}

export const PresentationDeckModal: React.FC<PresentationDeckModalProps> = ({
  isOpen,
  onClose,
  onOpenFigma
}) => {
  if (!isOpen) return null;

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const currentSlide = SLIDES[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSlideSvg = () => {
    downloadSingleFile(
      `AlumiCraft-Slide-${currentSlide.number}.svg`,
      generateFigmaSlideDeckSvg(),
      'image/svg+xml'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-6xl h-[92vh] bg-[#12141a] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Header */}
        <div className="h-16 px-6 bg-[#0c0e12] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display text-sm font-bold text-white">
                AlumiCraft GTM Pitch Deck
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Users className="w-3 h-3 text-slate-500" />
                <span>Presented by: Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 px-2 py-1 bg-black/40 rounded border border-white/[0.06]">
              Slide {currentSlideIndex + 1} of {SLIDES.length}
            </span>

            <button
              onClick={handleDownloadSlideSvg}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Download Vector SVG of this slide"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SVG</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close Deck"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Display Arena (16:9 Aspect Ratio Focus) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-[#090b0e]">
          <div className="w-full max-w-4xl aspect-[16/9] min-h-[460px] rounded-2xl bg-[#14171f] border border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Top Slide Meta */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 tracking-wider">
                  ALUMICRAFT RESEARCH
                </span>
                <span className="text-slate-600 font-mono">·</span>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  {currentSlide.category}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500">
                0{currentSlide.number} / 12
              </div>
            </div>

            {/* Slide Body */}
            <div className="my-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {currentSlide.title}
                </h2>
                {currentSlide.subtitle && (
                  <p className="text-sm sm:text-base text-amber-300/90 font-medium mt-1">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Slide Content Points */}
              <div className="space-y-3">
                {currentSlide.content.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Highlight Callout */}
              {currentSlide.highlight && (
                <div className="p-3.5 rounded-xl bg-amber-400/[0.08] border border-amber-400/20 text-xs sm:text-sm font-medium text-amber-200">
                  <span className="font-bold text-amber-400">Key Takeaway: </span>
                  {currentSlide.highlight}
                </div>
              )}

              {/* Metrics Grid (if present) */}
              {currentSlide.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {currentSlide.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/[0.06]">
                      <div className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-xs font-semibold text-amber-400 mt-0.5">{m.label}</div>
                      {m.note && <div className="text-[11px] text-slate-400">{m.note}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <div>
                Authors: Asna Armeen Ayaz, Anzal, Azeem, Sufiyan, Abdullah
              </div>
              <div>
                AlumiCraft · Pure Aluminum Household Furniture &amp; Interior
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Slide Navigator & Thumbnails */}
        <div className="h-20 px-6 bg-[#0c0e12] border-t border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="p-2 text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Slide Selector Pill Buttons */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-xl py-1">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.number}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-7 h-7 text-xs font-mono rounded flex items-center justify-center transition-colors cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                {slide.number}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFigma}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Figma className="w-3.5 h-3.5" />
              <span>Inspect in Figma</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
