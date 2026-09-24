import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DEALS, INITIAL_SALES_REPS, INITIAL_METRICS, MONTHLY_REVENUE_HISTORY, INITIAL_ACTIVITY_STREAM } from './src/data/initialData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store for full-stack operations
let deals = [...INITIAL_DEALS];
let reps = [...INITIAL_SALES_REPS];
let metrics = { ...INITIAL_METRICS };
let activities = [...INITIAL_ACTIVITY_STREAM];

// REST API Endpoints
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'PulseSales Enterprise API',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/metrics', (req: Request, res: Response) => {
  res.json({ success: true, data: metrics });
});

app.get('/api/deals', (req: Request, res: Response) => {
  const { stage, region, repId } = req.query;
  let filtered = [...deals];
  if (stage && typeof stage === 'string') {
    filtered = filtered.filter((d) => d.stage === stage);
  }
  if (region && typeof region === 'string') {
    filtered = filtered.filter((d) => d.region === region);
  }
  if (repId && typeof repId === 'string') {
    filtered = filtered.filter((d) => d.repId === repId);
  }
  res.json({ success: true, total: filtered.length, data: filtered });
});

app.post('/api/deals', (req: Request, res: Response) => {
  const newDeal = {
    ...req.body,
    id: `DEAL-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  deals.unshift(newDeal);

  // Add activity log
  activities.unshift({
    id: `act-${Date.now()}`,
    timestamp: 'Just now',
    repName: newDeal.repName || 'Account Executive',
    repAvatar: newDeal.repAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    type: 'deal_advanced',
    description: `Created new deal "${newDeal.title}" in ${newDeal.stage}`,
    companyName: newDeal.company,
    amount: newDeal.value,
  });

  res.status(201).json({ success: true, data: newDeal });
});

app.patch('/api/deals/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = deals.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Deal not found' });
  }

  const updatedDeal = { ...deals[index], ...req.body };
  deals[index] = updatedDeal;

  res.json({ success: true, data: updatedDeal });
});

app.get('/api/reps', (req: Request, res: Response) => {
  res.json({ success: true, data: reps });
});

app.get('/api/activities', (req: Request, res: Response) => {
  res.json({ success: true, data: activities.slice(0, 20) });
});

app.get('/api/history', (req: Request, res: Response) => {
  res.json({ success: true, data: MONTHLY_REVENUE_HISTORY });
});

// Serve frontend static build if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Only start listening if executed directly
if (process.env.NODE_ENV === 'production' || process.env.RUN_SERVER === 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 PulseSales Backend server active on port ${PORT}`);
  });
}

export default app;
