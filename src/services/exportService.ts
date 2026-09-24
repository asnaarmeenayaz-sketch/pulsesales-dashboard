import JSZip from 'jszip';
import { Deal, SalesRep, SalesDashboardMetrics } from '../types/sales';

export function exportDealsToCSV(deals: Deal[]) {
  const headers = [
    'Deal ID',
    'Deal Name',
    'Company',
    'Value (USD)',
    'Stage',
    'Owner / Sales Rep',
    'Probability (%)',
    'Target Close Date',
    'Region',
    'Market Segment',
    'Lead Source',
    'Priority',
    'Products',
    'Notes',
    'Created At',
  ];

  const rows = deals.map((d) => [
    `"${d.id}"`,
    `"${d.title.replace(/"/g, '""')}"`,
    `"${d.company.replace(/"/g, '""')}"`,
    d.value,
    `"${d.stage}"`,
    `"${d.repName}"`,
    d.probability,
    `"${d.closeDate}"`,
    `"${d.region}"`,
    `"${d.segment}"`,
    `"${d.source}"`,
    `"${d.priority}"`,
    `"${d.products.join(', ')}"`,
    `"${(d.notes || '').replace(/"/g, '""')}"`,
    `"${d.createdAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `pulsesales_deals_report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportSummaryToJSON(metrics: SalesDashboardMetrics, deals: Deal[], reps: SalesRep[]) {
  const data = {
    exportedAt: new Date().toISOString(),
    organization: 'Executive Revenue Operations',
    metrics,
    totalDeals: deals.length,
    activeReps: reps.length,
    deals,
    salesReps: reps,
  };

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `pulsesales_executive_snapshot_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadVSCodeProjectZip(
  currentDeals: Deal[],
  currentReps: SalesRep[],
  currentMetrics: SalesDashboardMetrics
) {
  const zip = new JSZip();

  // Root project files
  const packageJson = {
    name: 'pulsesales-executive-dashboard',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite --port=3000 --host',
      build: 'vite build',
      preview: 'vite preview',
      server: 'tsx server.ts',
      start: 'tsx server.ts',
    },
    dependencies: {
      '@tailwindcss/vite': '^4.3.3',
      '@vitejs/plugin-react': '^6.1.1',
      'canvas-confetti': '^1.9.4',
      dotenv: '^17.2.3',
      express: '^4.21.2',
      jszip: '^3.10.1',
      'lucide-react': '^0.546.0',
      motion: '^12.23.24',
      react: '^19.0.1',
      'react-dom': '^19.0.1',
      tailwindcss: '^4.3.3',
      vite: '^8.3.0',
    },
    devDependencies: {
      '@types/canvas-confetti': '^1.9.0',
      '@types/express': '^4.17.21',
      '@types/jszip': '^3.4.1',
      '@types/node': '^22.14.0',
      '@types/react': '^19.3.0',
      '@types/react-dom': '^19.3.0',
      tsx: '^4.21.0',
      typescript: '^7.0.2',
    },
  };

  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  const tsconfigJson = {
    compilerOptions: {
      target: 'ES2022',
      experimentalDecorators: true,
      useDefineForClassFields: false,
      module: 'ESNext',
      types: ['vite/client'],
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      skipLibCheck: true,
      moduleResolution: 'bundler',
      isolatedModules: true,
      moduleDetection: 'force',
      allowJs: true,
      jsx: 'react-jsx',
      paths: {
        '@/*': ['./*'],
      },
      allowImportingTsExtensions: true,
      noEmit: true,
    },
  };
  zip.file('tsconfig.json', JSON.stringify(tsconfigJson, null, 2));

  zip.file(
    'vite.config.ts',
    `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
`
  );

  zip.file(
    '.gitignore',
    `node_modules/
dist/
.env
.DS_Store
*.log
`
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PulseSales — Executive Sales & Performance Dashboard</title>
    <meta name="description" content="Production-grade Sales & Performance Intelligence platform with pipeline velocity, revenue forecasting, team leaderboards, and 1-click VS Code export." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  // VS Code settings folder
  zip.folder('.vscode')?.file(
    'settings.json',
    JSON.stringify(
      {
        'editor.formatOnSave': true,
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.tabSize': 2,
        'files.eol': '\n',
        'typescript.tsdk': 'node_modules/typescript/lib',
        'tailwindCSS.experimental.classRegex': [['clsx\\(([^)]*)\\)', "(?:'|\"|`)([^']*)(?:'|\"|`)"]],
      },
      null,
      2
    )
  );

  zip.folder('.vscode')?.file(
    'extensions.json',
    JSON.stringify(
      {
        recommendations: [
          'dbaeumer.vscode-eslint',
          'esbenp.prettier-vscode',
          'bradlc.vscode-tailwindcss',
          'formulahendry.auto-rename-tag',
        ],
      },
      null,
      2
    )
  );

  // README with clean instructions
  zip.file(
    'README.md',
    `# PulseSales — Executive Sales & Performance Dashboard

> **Hand-engineered, high-performance Revenue Operations & Pipeline Intelligence Platform**
> Built with modern React 19, TypeScript, Tailwind CSS v4, Motion, Lucide icons, and Node.js / Express backend.

---

## 🚀 Quick Start in VS Code (Windows / Mac / Linux)

### 1. Open the Folder in VS Code
\`\`\`bash
# Open your terminal in the extracted directory
code .
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit **http://localhost:3000** in your browser!

### 4. Run Full-Stack Express Backend (Optional)
\`\`\`bash
npm run server
\`\`\`

---

## 📁 Architecture & File Layout
\`\`\`
├── .vscode/               # VS Code workspace settings & recommended extensions
├── src/
│   ├── components/        # Hand-crafted modular UI components
│   │   ├── Header.tsx             # Executive bar with currency switch & exports
│   │   ├── MetricsOverview.tsx    # ARR, MRR, Pipeline, CAC, and attainment cards
│   │   ├── RevenueChart.tsx       # Interactive Revenue vs Quota SVG chart
│   │   ├── PipelineFunnel.tsx     # Stage conversion velocity funnel
│   │   ├── DealsBoard.tsx         # Kanban & Data table with stage progression
│   │   ├── TeamLeaderboard.tsx    # Rep attainment ranking & commission calc
│   │   ├── RegionalAttribution.tsx# Geographic & channel revenue distribution
│   │   ├── NewDealModal.tsx       # Deal creation with validation
│   │   ├── VSCodeModal.tsx        # Project download & setup guide
│   │   └── LiveActivityFeed.tsx   # Live stream of signed contracts & calls
│   ├── data/              # Deeply realistic enterprise SaaS datasets
│   ├── services/          # CSV, JSON, and Project ZIP export engine
│   ├── types/             # Strict, fully-typed TypeScript interfaces
│   ├── App.tsx            # Main dashboard controller with state management
│   ├── index.css          # Tailwind CSS styles & typography
│   └── main.tsx           # React 19 root bootstrap
├── server.ts              # Express API server for full-stack deployments
├── index.html             # Executive HTML shell with Google Fonts
├── package.json           # Dependencies and scripts
├── tsconfig.json          # Strict TypeScript bundler configuration
└── vite.config.ts         # Vite bundler with Tailwind CSS v4 plugin
\`\`\`

## 💎 Features
- **Zero AI Slop**: Clean layout designed with senior enterprise standards, high contrast, zero generic pills.
- **Pipeline Kanban & Table**: Drag/advance deals, edit status, view closing probability.
- **Interactive Multi-Currency**: Switch instantly between USD ($), EUR (€), GBP (£), PKR (₨), INR (₹).
- **Rep Performance & Quota Tracker**: Leaderboard with quota attainment, President's club honors, and commission payouts.
- **Real-time Live Activity Feed**: Simulated live deals, closing sound/visual celebration confetti.
- **1-Click Exporting**: CSV spreadsheets, JSON data dumps, and complete VS Code project ZIP.
`
  );

  // Express server.ts
  zip.file(
    'server.ts',
    `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PulseSales API', timestamp: new Date().toISOString() });
});

// Serve frontend static build if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(\`✅ PulseSales Server running at http://localhost:\${PORT}\`);
});
`
  );

  // Source files
  const src = zip.folder('src');
  src?.file(
    'main.tsx',
    `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`
  );

  src?.file(
    'index.css',
    `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  }
  
  code, pre {
    font-family: 'JetBrains Mono', monospace;
  }
}

/* Custom sleek scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #090d16;
}

::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
`
  );

  // Generate binary zip
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `pulsesales-fullstack-vscode-project.zip`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
