import React, { useState } from 'react';
import { 
  X, 
  Figma, 
  Download, 
  Copy, 
  Check, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Layers, 
  Sliders, 
  Code2, 
  FileCode, 
  Palette,
  ExternalLink,
  Sparkles,
  Archive
} from 'lucide-react';
import { 
  FIGMA_TOKENS, 
  FIGMA_DOCUMENT_SCHEMA, 
  generateFigmaSvgLanding, 
  generateFigmaSlideDeckSvg,
  downloadFigmaBundleZip,
  downloadSingleFile
} from '../data/figmaData';
import confetti from 'canvas-confetti';

interface FigmaStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FigmaStudioModal: React.FC<FigmaStudioModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'inspector' | 'tokens' | 'export' | 'guide'>('export');
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedLayer, setSelectedLayer] = useState<string>('hero');
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadingZip, setDownloadingZip] = useState<boolean>(false);

  const layers: Record<string, {
    name: string;
    type: string;
    width: number;
    height: number;
    layout: string;
    padding: string;
    gap: string;
    fill: string;
    border: string;
    font: string;
    cssSnippet: string;
  }> = {
    header: {
      name: '01_Header_TopBar_Contract',
      type: 'FRAME (Auto Layout Horizontal)',
      width: 1440,
      height: 80,
      layout: 'Space-Between / Center Align',
      padding: 'Top: 0, Right: 32px, Bottom: 0, Left: 32px',
      gap: '28px',
      fill: '#0F1115 (90% Opacity Blur)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      font: 'Syne 700 / Plus Jakarta Sans 500',
      cssSnippet: `display: flex;\njustify-content: space-between;\nalign-items: center;\nheight: 80px;\npadding: 0 32px;\nbackground: rgba(15, 17, 21, 0.9);\nborder-bottom: 1px solid rgba(255, 255, 255, 0.08);\nbackdrop-filter: blur(12px);`
    },
    hero: {
      name: '02_Hero_Section_Split_Architecture',
      type: 'FRAME (Auto Layout Horizontal / 2-Col)',
      width: 1440,
      height: 720,
      layout: 'Two Column Responsive Grid',
      padding: 'Top: 64px, Right: 80px, Bottom: 80px, Left: 80px',
      gap: '48px',
      fill: '#0F1115 (Dominant Canvas)',
      border: 'None (Hairline Bottom Divider)',
      font: 'Syne 800 (Display 56px) + Plus Jakarta Sans 400',
      cssSnippet: `display: grid;\ngrid-template-columns: repeat(12, 1fr);\ngap: 48px;\npadding: 64px 80px 80px 80px;\nbackground-color: #0F1115;\ncolor: #ECEEF2;`
    },
    productCard: {
      name: '03_Product_Card_Component',
      type: 'COMPONENT (Auto Layout Vertical)',
      width: 400,
      height: 480,
      layout: 'Vertical Stack',
      padding: '20px',
      gap: '16px',
      fill: '#14171F (Structural Surface)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      font: 'Syne 700 (18px) + JetBrains Mono (11px)',
      cssSnippet: `display: flex;\nflex-direction: column;\ngap: 16px;\npadding: 20px;\nbackground: #14171F;\nborder: 1px solid rgba(255, 255, 255, 0.08);\nborder-radius: 12px;\ntransition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);`
    },
    matrix: {
      name: '04_Comparison_Matrix_Table',
      type: 'FRAME (Auto Layout Table Row)',
      width: 1280,
      height: 520,
      layout: 'Table Matrix (3-Zone)',
      padding: '24px',
      gap: '1px (Dividers)',
      fill: '#14171F',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      font: 'Plus Jakarta Sans 500 + Syne 700',
      cssSnippet: `display: table;\nwidth: 100%;\nborder-collapse: collapse;\nbackground: #14171F;\nborder-radius: 12px;\noverflow: hidden;`
    }
  };

  const currentLayer = layers[selectedLayer] || layers.hero;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(FIGMA_DOCUMENT_SCHEMA, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      await downloadFigmaBundleZip();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadLandingSvg = () => {
    downloadSingleFile("AlumiCraft-Storefront-1440.svg", generateFigmaSvgLanding(), "image/svg+xml");
  };

  const handleDownloadDeckSvg = () => {
    downloadSingleFile("AlumiCraft-Pitch-Deck.svg", generateFigmaSlideDeckSvg(), "image/svg+xml");
  };

  const handleDownloadTokens = () => {
    downloadSingleFile("alumicraft-tokens.json", JSON.stringify(FIGMA_TOKENS, null, 2), "application/json");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-6xl h-[92vh] bg-[#12141a] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Figma Studio Top Bar */}
        <div className="h-16 px-6 bg-[#0c0e12] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center shadow-sm">
              <Figma className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-white tracking-wide">
                  AlumiCraft Figma Studio
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready to Export
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Auto-Layout Frames · Token Studio JSON · Vector Artboards · 1440px Grid
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#1a1e27] border border-white/[0.06] rounded-lg">
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'export' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download &amp; Export</span>
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'inspector' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Frame Inspector</span>
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'tokens' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design Tokens</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'guide' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Import Guide</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Figma Studio"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0f1115]">
          
          {/* TAB 1: EXPORT & DOWNLOAD */}
          {activeTab === 'export' && (
            <div className="max-w-4xl mx-auto space-y-8 py-2">
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NATIVE FIGMA ASSET EXPORT ENGINE</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white">
                  Download AlumiCraft Design Assets For Figma
                </h3>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  Export complete vector artboards, design tokens, and layout schemas. 
                  Easily drag and drop directly into Figma or load with standard Figma plugins.
                </p>
              </div>

              {/* Primary Master Download Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/[0.12] via-[#161a22] to-[#12151c] border border-amber-400/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
                    <Archive className="w-4 h-4" />
                    <span>RECOMMENDED COMPLETE PACKAGE</span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    AlumiCraft Full Figma Design System (.zip)
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    Includes 1440px Landing Page SVG artboards, 16:9 Presentation Deck SVG, 
                    <code className="text-amber-300 font-mono"> tokens.json</code> for Tokens Studio, 
                    <code className="text-amber-300 font-mono"> figma-nodes.json</code> schema, and CSS variables.
                  </p>
                </div>

                <button
                  onClick={handleDownloadZip}
                  disabled={downloadingZip}
                  className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-400/20 whitespace-nowrap shrink-0 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingZip ? 'Packaging Zip...' : 'Download Figma Bundle (.zip)'}</span>
                </button>
              </div>

              {/* Individual Export Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1440px Landing Vector SVG */}
                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400">VECTOR ARTBOARD</span>
                      <span className="text-[10px] font-mono text-slate-500">1440 × 2200 px</span>
                    </div>
                    <div className="text-base font-bold text-white mt-1">Desktop Storefront (SVG)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Directly drag &amp; drop into Figma canvas. Opens as editable auto-layout vector frames with text layers and headers.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadLandingSvg}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Storefront SVG</span>
                  </button>
                </div>

                {/* 16:9 Presentation Deck Vector SVG */}
                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400">SLIDE DECK ARTBOARD</span>
                      <span className="text-[10px] font-mono text-slate-500">1920 × 1080 px</span>
                    </div>
                    <div className="text-base font-bold text-white mt-1">GTM Market Deck (SVG)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Contains the survey data slides (45.5% termites, 68.3% durability) ready for Figma presentation decks.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadDeckSvg}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Pitch Deck SVG</span>
                  </button>
                </div>

                {/* Tokens Studio JSON */}
                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400">TOKENS STUDIO</span>
                      <span className="text-[10px] font-mono text-slate-500">JSON Format</span>
                    </div>
                    <div className="text-base font-bold text-white mt-1">Design System Tokens (JSON)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Directly importable into "Tokens Studio for Figma" plugin or Figma Variables. Brand colors, radii, and fonts.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadTokens}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download tokens.json</span>
                  </button>
                </div>

                {/* Copy Figma JSON Node Tree */}
                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400">FIGMA PLUGIN SCHEMA</span>
                      <span className="text-[10px] font-mono text-slate-500">Clipboard Ready</span>
                    </div>
                    <div className="text-base font-bold text-white mt-1">Figma REST / Node Tree</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Copy the full node hierarchy schema to paste into "JSON to Figma" or "HTML to Figma" plugins.
                    </p>
                  </div>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-amber-400 bg-amber-400/[0.1] hover:bg-amber-400/[0.2] border border-amber-400/30 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Figma Node JSON'}</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: FRAME INSPECTOR */}
          {activeTab === 'inspector' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Layers List */}
              <div className="lg:col-span-4 bg-[#14171f] border border-white/[0.08] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Artboard Layers</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Frame: Desktop 1440</span>
                </div>

                <div className="space-y-1.5">
                  {Object.entries(layers).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLayer(key)}
                      className={`w-full p-2.5 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between text-xs ${
                        selectedLayer === key
                          ? 'bg-amber-400/[0.12] border border-amber-400/30 text-white font-medium'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="truncate">{val.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">{val.width}×{val.height}</span>
                    </button>
                  ))}
                </div>

                {/* Viewport frame selector */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Simulate Viewport Frame:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-lg border border-white/[0.06]">
                    <button
                      onClick={() => setDeviceFrame('desktop')}
                      className={`flex items-center justify-center gap-1 py-1.5 text-[11px] rounded transition-colors ${
                        deviceFrame === 'desktop' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>1440px</span>
                    </button>
                    <button
                      onClick={() => setDeviceFrame('tablet')}
                      className={`flex items-center justify-center gap-1 py-1.5 text-[11px] rounded transition-colors ${
                        deviceFrame === 'tablet' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Tablet className="w-3 h-3" />
                      <span>768px</span>
                    </button>
                    <button
                      onClick={() => setDeviceFrame('mobile')}
                      className={`flex items-center justify-center gap-1 py-1.5 text-[11px] rounded transition-colors ${
                        deviceFrame === 'mobile' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>375px</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Auto-Layout & CSS Inspector */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-[#14171f] border border-white/[0.08] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div>
                      <div className="text-xs font-mono text-amber-400">{currentLayer.type}</div>
                      <div className="text-base font-bold text-white">{currentLayer.name}</div>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-400">
                      W: {currentLayer.width}px · H: {currentLayer.height}px
                    </div>
                  </div>

                  {/* Properties Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                      <div className="text-slate-500 font-mono text-[10px] uppercase">Auto Layout Mode</div>
                      <div className="text-white font-medium mt-0.5">{currentLayer.layout}</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                      <div className="text-slate-500 font-mono text-[10px] uppercase">Spacing / Gap</div>
                      <div className="text-white font-mono mt-0.5">{currentLayer.gap}</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                      <div className="text-slate-500 font-mono text-[10px] uppercase">Padding (Box Model)</div>
                      <div className="text-white font-mono mt-0.5">{currentLayer.padding}</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                      <div className="text-slate-500 font-mono text-[10px] uppercase">Fill &amp; Background</div>
                      <div className="text-white font-mono mt-0.5">{currentLayer.fill}</div>
                    </div>
                  </div>

                  {/* CSS Code Snippet */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Figma Inspect CSS Snippet</span>
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentLayer.cssSnippet);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer font-mono"
                      >
                        {copied ? 'Copied!' : 'Copy CSS'}
                      </button>
                    </div>
                    <pre className="p-4 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-xs text-amber-300/90 overflow-x-auto leading-relaxed">
                      {currentLayer.cssSnippet}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DESIGN TOKENS */}
          {activeTab === 'tokens' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-xl font-bold text-white">AlumiCraft Design System Tokens</h4>
                  <p className="text-xs text-slate-400">Tokens Studio &amp; Figma Variables compliant</p>
                </div>
                <button
                  onClick={handleDownloadTokens}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download tokens.json</span>
                </button>
              </div>

              {/* Color Tokens Swatches */}
              <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Brand &amp; Material Color Tokens
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'aluminumDark', hex: '#0F1115', role: 'Dominant Canvas' },
                    { name: 'aluminumSurface', hex: '#161920', role: 'Card Surfaces' },
                    { name: 'aluminumAccent', hex: '#F59E0B', role: 'Primary CTA Gold' },
                    { name: 'termiteShield', hex: '#10B981', role: 'Termite Immune Green' },
                    { name: 'matteCharcoal', hex: '#262930', role: 'Powder Coat' },
                    { name: 'brushedSilver', hex: '#D1D5DB', role: 'Natural Silver' },
                    { name: 'walnutSublimation', hex: '#5C3A21', role: 'Teak Woodgrain' },
                    { name: 'champagneBronze', hex: '#8C7853', role: 'Anodized Bronze' },
                  ].map((color) => (
                    <div key={color.name} className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
                      <div className="w-full h-8 rounded border border-white/20" style={{ backgroundColor: color.hex }} />
                      <div className="text-xs font-semibold text-white">{color.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{color.hex}</div>
                      <div className="text-[10px] text-slate-500">{color.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Spacing */}
              <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Typography Scale &amp; Font Families
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                    <div className="text-slate-500 font-mono text-[10px]">DISPLAY FONT</div>
                    <div className="text-lg font-bold text-white font-display mt-1">Syne</div>
                    <div className="text-[11px] text-slate-400">Headlines, Branding, Numerals</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                    <div className="text-slate-500 font-mono text-[10px]">BODY FONT</div>
                    <div className="text-lg font-bold text-white mt-1">Plus Jakarta Sans</div>
                    <div className="text-[11px] text-slate-400">Prose, Specs, Navigation</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-white/[0.06]">
                    <div className="text-slate-500 font-mono text-[10px]">MONO METRIC FONT</div>
                    <div className="text-lg font-bold text-white font-mono mt-1">JetBrains Mono</div>
                    <div className="text-[11px] text-slate-400">Prices, Alloy Grades, Percentages</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: IMPORT GUIDE */}
          {activeTab === 'guide' && (
            <div className="max-w-3xl mx-auto space-y-6 py-2">
              <h4 className="font-display text-2xl font-bold text-white">How to Use These Assets in Figma</h4>
              
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-base font-semibold text-white">Direct Drag &amp; Drop (Vector Artboards)</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Download <code className="text-amber-300 font-mono">AlumiCraft-Storefront-1440.svg</code> or the bundle zip. 
                      Drag the SVG file straight into any Figma canvas. Figma instantly converts the SVG into native frames with text layers, geometric shapes, and styles!
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-base font-semibold text-white">Load Design Tokens (Tokens Studio Plugin)</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Install the free <strong>Tokens Studio for Figma</strong> plugin. Open the plugin, click "Load from JSON", and select <code className="text-amber-300 font-mono">tokens.json</code>. 
                      All colors, typography styles, and spacing variables will be wired up to your Figma document.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#14171f] border border-white/[0.08] flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-base font-semibold text-white">HTML to Figma / JSON to Figma Plugin</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Run the "JSON to Figma" plugin, paste the copied JSON from the export tab, and Figma will generate native Auto-Layout frames matching our 1440px desktop grid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleDownloadZip}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-400/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete Figma Bundle (.zip)</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
