import { error, log } from 'node:console';
import { env, uptime, exit } from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { rateLimiter } from './middleware/rate-limiter.js';
import { errorHandler } from './middleware/error-handler.js';
import { mcpRouter } from './routers/mcp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = env.PORT || 3000;

/**
 * Express app with DNS rebinding protection
 * [TODO] monitor the issue I opened
 * https://github.com/modelcontextprotocol/typescript-sdk/issues/1354
 * to patch the json bodyparser limit
 */
const app = createMcpExpressApp({ limit: '10mb' });
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    methods: 'GET,POST,DELETE',
    exposedHeaders: ['mcp-protocol-version'],
  })
);
app.use(rateLimiter);

app.use(express.static('public'));
app.get('/health', (_req, res) =>
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(uptime()),
  })
);
app.get('/', (_req, res) => res.sendFile(join(__dirname, 'index.html')));
app.use('/', mcpRouter);

app.use((req, res) =>
  res.status(404).json({
    success: false,
    error: `${req.method} ${req.originalUrl} not found`,
  })
);
app.use(errorHandler);

const server = app.listen(port, () => {
  log(`🚀 McpMocker server running on port ${port}`);
  log(`🌐 Main page: http://localhost:${port}/`);
  log(`🤖 MCP endpoint: http://localhost:${port}/mcp`);
  log(`📊 Health check: http://localhost:${port}/health`);
});

server.on('error', (err) => error('Server failure:', err));

process.on('SIGINT', () => {
  log('SIGINT received (Ctrl+C), shutting down...');
  server.close(() => {
    log('Express server closed');
    exit(0);
  });
  // close keep-alive connections
  // after server.close to avoid race conditions
  server.closeAllConnections();
});

process.on('SIGTERM', () => {
  log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    log('Express server closed');
    exit(0);
  });
  // close keep-alive connections
  // after server.close to avoid race conditions
  server.closeAllConnections();
});
