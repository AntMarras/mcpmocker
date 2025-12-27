import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod';

export const name = 'comments_per_view';

export const registerCommentsPerViewTool = (server: McpServer) => {
  const toolArgSchema = z.object({
    comments: z.coerce
      .number()
      .int()
      .positive()
      .refine((val) => Number.isSafeInteger(val), { message: 'comments exceeds safe integer range' })
      .describe('Number of comments of the post'),
    views: z.coerce
      .number()
      .int()
      .positive()
      .refine((val) => Number.isSafeInteger(val), { message: 'comments exceeds safe integer range' })
      .describe('Number of views of the post'),
  });

  server.registerTool(
    name,
    {
      title: 'Comments per View',
      description: 'Tool to estimate comments per view (engagement) of a post',
      inputSchema: toolArgSchema,
    },
    (args) => {
      const validatedArgs = toolArgSchema.safeParse(args);
      if (!validatedArgs.success) throw new Error(`Invalid args format: ${validatedArgs.error.message}`);
      const comments = validatedArgs.data.comments;
      const views = validatedArgs.data.views;

      const commentsPerView = views <= 0 ? 0 : comments / views;

      return {
        content: [{ type: 'text', text: `The comments per view (engagement) score is ${commentsPerView}` }],
      };
    }
  );
};
