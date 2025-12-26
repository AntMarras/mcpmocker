import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerUserResources } from './resources/user-resources.js';

const mcpServer = new McpServer({
  name: 'mcpmocker',
  version: '0.0.1',
});

// Register resources
registerUserResources(mcpServer);

async function main() {
  const transport = new StdioServerTransport();
  mcpServer.connect(transport);
}

main().catch((error) => {
  console.error('Server error: ', error);
  process.exit(1);
});
