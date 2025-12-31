import { error } from 'node:console';
import { Request, Response, Router } from 'express';
import { mcpServer } from '../../mcp/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

/* Create a stateless Streamable HTTP server */

export const mcpRouter = Router();

mcpRouter.post('/mcp', async (req, res) => {
  try {
    const statelessTransport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await mcpServer.connect(statelessTransport);
    await statelessTransport.handleRequest(req, res, req.body);
    res.on('close', () => {
      statelessTransport.close();
      mcpServer.close();
    });
  } catch (e) {
    error('HTTP transport error:', e);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

const methodNotSupported = async (req: Request, res: Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32601,
      message: 'Method not allowed.',
    },
    id: null,
  });
};

/* In stateless mode SSE are not supported */
mcpRouter.get('/mcp', methodNotSupported);

/* In stateless mode explicitly terminate the session is not supported */
mcpRouter.delete('/mcp', methodNotSupported);
