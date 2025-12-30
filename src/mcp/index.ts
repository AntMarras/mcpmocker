import pkg from '../../package.json' with {type: 'json'}
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerUserResources } from './resources/user-resources.js';
import { registerPostResources } from './resources/post-resources.js';
import { registerPostEngagementReportPrompt } from './prompts/post-engagement-report.js';
import { registerCommentsPerViewTool } from './tools/comments-per-view.js';
import { registerGetPostCommentsTool } from './tools/get-post-comments.js';

export const mcpServer = new McpServer({
  name: 'mcpmocker',
  title: 'McpMocker server',
  version: pkg.version,
});

// Register resources
registerUserResources(mcpServer);
registerPostResources(mcpServer);

// Register prompts
registerPostEngagementReportPrompt(mcpServer);

// Tools
registerCommentsPerViewTool(mcpServer);
registerGetPostCommentsTool(mcpServer);
