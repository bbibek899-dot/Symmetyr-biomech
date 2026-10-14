import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const dataDir = path.resolve(__dirname, 'data');
const publicDir = path.resolve(__dirname, 'public');
const imagesDir = path.resolve(publicDir, 'images');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const campaignFilePath = path.join(dataDir, 'publishedCampaign.json');
const donationsFilePath = path.join(dataDir, 'publishedDonations.json');

app.get('/api/campaign', (req, res) => {
  try {
    if (fs.existsSync(campaignFilePath)) {
      const data = fs.readFileSync(campaignFilePath, 'utf8');
      return res.json(JSON.parse(data));
    }
    return res.json(null);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read campaign' });
  }
});

app.post('/api/campaign', (req, res) => {
  try {
    const campaignData = req.body;
    fs.writeFileSync(campaignFilePath, JSON.stringify(campaignData, null, 2), 'utf8');
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save campaign' });
  }
});

app.get('/api/donations', (req, res) => {
  try {
    if (fs.existsSync(donationsFilePath)) {
      const data = fs.readFileSync(donationsFilePath, 'utf8');
      return res.json(JSON.parse(data));
    }
    return res.json([]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read donations' });
  }
});

app.post('/api/donations', (req, res) => {
  try {
    const donationsData = req.body;
    fs.writeFileSync(donationsFilePath, JSON.stringify(donationsData, null, 2), 'utf8');
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save donations' });
  }
});

app.post('/api/upload-image', (req, res) => {
  try {
    const { base64Data, type } = req.body;
    if (!base64Data || !type) {
      return res.status(400).json({ error: 'Missing base64Data or type' });
    }
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');
    const fileName = `${type}_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(imagesDir, fileName), buffer);
    return res.json({ success: true, url: `/images/${fileName}` });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save image' });
  }
});

// Strict Security & Anti-Scraping Middleware: Block AI bots, automated crawlers, scrapers, and source requests
app.use((req, res, next) => {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  
  // Known AI bots, scrapers, and HTTP command-line tools
  const blockedAgents = [
    'claudebot', 'claude-web', 'anthropic', 'gptbot', 'chatgpt-user',
    'perplexitybot', 'ccbot', 'bytespider', 'scrapy', 'curl', 'wget',
    'python-requests', 'aiohttp', 'headlesschrome', 'phantomjs', 'postmanruntime',
    'puppeteer', 'playwright', 'axios', 'go-http-client', 'httpclient',
    'facebookexternalhit', 'petalbot', 'semrushbot', 'ahrefsbot'
  ];

  const isBlockedAgent = blockedAgents.some(agent => userAgent.includes(agent));
  if (isBlockedAgent) {
    return res.status(403).type('text/plain').send('403 Forbidden: Automated harvesting, AI crawlers, and scrapers are strictly blocked by Symmetry Security Shield.');
  }

  const p = req.path.toLowerCase();
  // Block any attempt to request source files, configurations, backups, or git metadata
  if (
    p.endsWith('.zip') || p.endsWith('.tar') || p.endsWith('.gz') ||
    p.endsWith('.map') || p.endsWith('.ts') || p.endsWith('.tsx') ||
    p.endsWith('.lock') || p.includes('.git') || p.includes('.env') ||
    p.includes('/api/download-source') || p.endsWith('.sh') || p.endsWith('.yml') ||
    p.endsWith('.json') && !p.startsWith('/manifest.json')
  ) {
    return res.status(403).type('text/plain').send('403 Forbidden: Source files and system blueprints are locked.');
  }

  // Security and Anti-Theft headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use(express.static(publicDir));

if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distDir = path.resolve(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Symmetry App listening on http://0.0.0.0:${PORT}`);
});
