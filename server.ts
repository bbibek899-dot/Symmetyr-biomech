import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { exec } from 'child_process';
import util from 'util';

import { ZipArchive } from 'archiver';
const execPromise = util.promisify(exec);

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

// ==============================================================
// OWNER MASTER VAULT & GITHUB INTEGRATION APIS
// Allows authorized owner (Bibek) to unlock code, view files,
// export source ZIP, and push to GitHub repository
// ==============================================================
const OWNER_PASSCODES = ['bibek2026', '899', 'bbibek899', 'symmetyr', 'symmetyr2026', 'symmetry', 'symmetry2026'];

function isAuthorizedOwner(req: express.Request): boolean {
  const token = (req.headers['x-owner-token'] || req.query.token || req.body?.ownerKey || '') as string;
  return typeof token === 'string' && OWNER_PASSCODES.includes(token.trim().toLowerCase());
}

// 1. Verify Owner Passcode
app.post('/api/owner/verify', (req, res) => {
  const { passcode } = req.body || {};
  if (passcode && OWNER_PASSCODES.includes(String(passcode).trim().toLowerCase())) {
    return res.json({ success: true, token: String(passcode).trim().toLowerCase(), owner: 'Bibek' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect passcode. Access denied.' });
});

// 2. Export Complete Clean Source Code as ZIP
app.get(['/api/owner/export-source', '/api/download-source.zip', '/download-source'], (req, res) => {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="symmetyr-clinical-source.zip"');

  const archive = new ZipArchive({ zlib: { level: 9 } });

  archive.on('error', (err) => {
    if (!res.headersSent) {
      res.status(500).send({ error: err.message });
    }
  });

  archive.pipe(res);

  // Essential project files
  const filesToInclude = [
    'index.html',
    'server.ts',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'README.md',
    '.gitignore',
    '.env.example',
    'metadata.json'
  ];

  filesToInclude.forEach(file => {
    const fullPath = path.resolve(__dirname, file);
    if (fs.existsSync(fullPath)) {
      archive.file(fullPath, { name: file });
    }
  });

  // Include public directory (icons, manifest, etc., skipping uploaded patient photos)
  if (fs.existsSync(publicDir)) {
    archive.directory(publicDir, 'public', (entry) => {
      if (entry.name.startsWith('images/') && entry.name !== 'images/') {
        return false; // Skip runtime patient photo uploads
      }
      return entry;
    });
  }

  // Include src directory if present
  const srcDir = path.resolve(__dirname, 'src');
  if (fs.existsSync(srcDir)) {
    archive.directory(srcDir, 'src');
  }

  archive.finalize();
});

// 3. View Source File In-Browser (Owner Only)
app.get('/api/owner/view-file', (req, res) => {
  if (!isAuthorizedOwner(req)) {
    return res.status(403).json({ error: 'Unauthorized: Owner token required.' });
  }
  const reqFile = String(req.query.file || 'index.html');
  const allowedFiles = ['index.html', 'server.ts', 'package.json', 'README.md', 'metadata.json', 'vite.config.ts', 'tsconfig.json'];
  if (!allowedFiles.includes(reqFile)) {
    return res.status(400).json({ error: 'File not accessible' });
  }
  const filePath = path.resolve(__dirname, reqFile);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return res.json({ success: true, file: reqFile, content });
});

// 4. Automated Git Push to GitHub (Owner Only)
app.post('/api/owner/push-github', async (req, res) => {
  if (!isAuthorizedOwner(req)) {
    return res.status(403).json({ error: 'Unauthorized: Owner token required.' });
  }
  const { repoUrl, token, branch = 'main' } = req.body || {};
  if (!repoUrl || !token) {
    return res.status(400).json({ error: 'Please provide both GitHub Repository URL and Personal Access Token.' });
  }

  let cleanRepo = String(repoUrl).trim();
  cleanRepo = cleanRepo.replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '');
  const cleanToken = String(token).trim();

  const authenticatedRemote = `https://${cleanToken}@github.com/${cleanRepo}.git`;

  try {
    // Configure Git user
    await execPromise('git config user.name "Bibek" && git config user.email "bbibek899@gmail.com"');
    
    // Remove temporary remote if existed
    try { await execPromise('git remote remove owner_github'); } catch (_) {}

    await execPromise(`git remote add owner_github "${authenticatedRemote}"`);
    
    // Commit any latest code
    try {
      await execPromise('git add . && git commit -m "Update Symmetyr Clinical Suite"');
    } catch (_) {}

    // Push to GitHub
    const { stdout, stderr } = await execPromise(`git push -u owner_github ${branch} --force`);
    
    // Safely remove authenticated remote so token is never stored on disk
    try { await execPromise('git remote remove owner_github'); } catch (_) {}

    return res.json({
      success: true,
      message: `Successfully pushed Symmetyr Clinical Suite to https://github.com/${cleanRepo}!`,
      output: stdout || stderr || 'Push completed successfully.'
    });
  } catch (err: any) {
    // Ensure credentials remote is wiped even on error
    try { await execPromise('git remote remove owner_github'); } catch (_) {}
    return res.status(500).json({
      success: false,
      error: err.message || 'Git push encountered an error. Check repository name and token permissions.'
    });
  }
});

// Health check endpoints for Cloud Run deployment & container probes
app.get(['/healthz', '/_ah/health', '/ping'], (req, res) => {
  return res.status(200).type('text/plain').send('OK');
});

// Strict Security & Anti-Scraping Middleware: Block AI bots, automated crawlers, scrapers, and source requests
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  
  // Expose owner routes and health checks
  if (p.startsWith('/api/owner/') || p === '/healthz' || p === '/_ah/health' || p === '/ping') {
    return next();
  }
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // Allow Google Cloud health checks
  if (userAgent.includes('googlehc') || userAgent.includes('health')) {
    return next();
  }
  
  // Known AI scraper bots, commercial harvesters, and scraper frameworks
  const blockedAgents = [
    'claudebot', 'claude-web', 'anthropic', 'gptbot', 'chatgpt-user',
    'perplexitybot', 'ccbot', 'bytespider', 'scrapy', 'headlesschrome',
    'phantomjs', 'postmanruntime', 'puppeteer', 'playwright',
    'facebookexternalhit', 'petalbot', 'semrushbot', 'ahrefsbot'
  ];

  const isBlockedAgent = blockedAgents.some(agent => userAgent.includes(agent));
  if (isBlockedAgent) {
    return res.status(403).type('text/plain').send('403 Forbidden: Automated harvesting, AI crawlers, and scrapers are strictly blocked by Symmetyr Security Shield.');
  }

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

  // Allow PWA icons, manifest, and favicons to be cached so Android launcher & WebAPK installer can load them
  if (p.endsWith('.png') || p.endsWith('.ico') || p.endsWith('.svg') || p.endsWith('.jpg') || p.endsWith('.webp')) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  } else if (p === '/manifest.json' || p === '/sw.js') {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  } else {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  }
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
  console.log(`[Server] Symmetyr App listening on http://0.0.0.0:${PORT}`);
});
