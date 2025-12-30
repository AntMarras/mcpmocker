import process, { exit } from 'node:process';
import { error } from 'node:console';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { mcpServer } from '../mcp/index.js';

/* in stdio transport message logging is only possible in stderr */

async function stdio() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  error('🚀 McpMocker running in stdio transport');

  process.on('SIGINT', async () => {
    error('SIGINT received (Ctrl+C), shutting down...');
    await mcpServer.close();
    exit(0);
  });

  process.on('SIGTERM', async () => {
    error('SIGTERM received, shutting down gracefully...');
    await mcpServer.close();
    exit(0);
  });
}

stdio().catch((e) => {
  error('Stdio transport error:', e);
  process.exit(1);
});
