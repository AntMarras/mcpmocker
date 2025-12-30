import { log } from 'node:console';
import { env, uptime, exit } from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = env.PORT || 3000;

/* Express app with DNS rebinding protection */
const app = createMcpExpressApp();
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

app.get('/health', (_req, res) =>
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(uptime()),
  })
);

app.get('/', (_req, res) => res.sendFile(join(__dirname, 'public', 'index.html')));

process.on('SIGINT', async () => {
  log('SIGINT received (Ctrl+C), shutting down...');
  exit(0);
});

process.on('SIGTERM', async () => {
  log('SIGTERM received, shutting down gracefully...');
  exit(0);
});

app.listen(port, () => {
  log(`🚀 McpMocker server running on port ${port}`);
  log(`🌐 Main page: http://localhost:${port}/`);
  log(`📊 Health check: http://localhost:${port}/health`);
});
