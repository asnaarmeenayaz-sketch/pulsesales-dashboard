import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Code2, 
  Terminal, 
  Check, 
  Copy, 
  FolderTree, 
  FileCode, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { Deal, SalesRep, SalesDashboardMetrics } from '../types/sales';
import { downloadVSCodeProjectZip } from '../services/exportService';

interface VSCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  reps: SalesRep[];
  metrics: SalesDashboardMetrics;
}

export const VSCodeModal: React.FC<VSCodeModalProps> = ({
  isOpen,
  onClose,
  deals,
  reps,
  metrics,
}) => {
  if (!isOpen) return null;

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadVSCodeProjectZip(deals, reps, metrics);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to generate project zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  VS Code Full-Stack Project Export
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Ready to Run
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hand-crafted architecture: 1-click download with React 19, TypeScript, Tailwind, and Express
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner: 1-Click Download */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Complete Source Code (.zip)</span>
            </div>
            <p className="text-xs text-slate-300">
              Includes all source files, configs, .vscode workspace settings, Express server, and updated live deals.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isDownloading ? (
              <span className="animate-pulse">Generating Project ZIP...</span>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded Successfully!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download for VS Code (.zip)</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Step Quick Start */}
        <div className="mt-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>How to Open & Run in VS Code (3 Fast Steps)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-[11px]">1</span>
                  Extract & Open
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Extract the downloaded zip archive and open the directory in VS Code:
              </p>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <code className="text-[11px] text-indigo-300 font-mono">code .</code>
                <button
                  onClick={() => copyToClipboard('code .', 'cmd1')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedCmd === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-[11px]">2</span>
                  Install Packages
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                In VS Code integrated terminal (<kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Ctrl+`</kbd> or <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Cmd+`</kbd>):
              </p>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <code className="text-[11px] text-indigo-300 font-mono">npm install</code>
                <button
                  onClick={() => copyToClipboard('npm install', 'cmd2')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedCmd === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-[11px]">3</span>
                  Launch Dashboard
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Start the development server with instant hot reload:
              </p>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <code className="text-[11px] text-indigo-300 font-mono">npm run dev</code>
                <button
                  onClick={() => copyToClipboard('npm run dev', 'cmd3')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedCmd === 'cmd3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Human-Engineered Codebase Features */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Why This Codebase Feels Human-Crafted (Senior Engineer Standards)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Clean Separation:</strong> Strict TypeScript interfaces in <code className="text-indigo-300 font-mono">src/types/sales.ts</code> with zero "any" types.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Full-Stack Ready:</strong> Native Express server in <code className="text-indigo-300 font-mono">server.ts</code> with REST API endpoints (<code className="text-indigo-300 font-mono">/api/metrics</code>, <code className="text-indigo-300 font-mono">/api/deals</code>).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Tailwind CSS v4:</strong> Streamlined modern styling with custom Plus Jakarta Sans & JetBrains Mono typography.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>VS Code Pre-Configured:</strong> Bundled with <code className="text-indigo-300 font-mono">.vscode/settings.json</code> for auto-formatting and ESLint recommendations.</span>
            </div>
          </div>
        </div>

        {/* Directory Layout Preview */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Target: node {'>='} 18.0.0 • Vite 6/8 • React 19 • Express 4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
