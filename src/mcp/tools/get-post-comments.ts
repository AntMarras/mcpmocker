import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod';
import { encode } from '@toon-format/toon';

/* postId = [1,100]; id = [1,1000] */
import {default as comments} from '#data/comments.json' with {type:'json'}

export const name = 'get_post_comments';

export const registerGetPostCommentsTool = (server: McpServer) => {
  const toolArgSchema = z.object({
    postId: z.coerce.number().int().positive().max(100).describe('The post ID'),
  });

  server.registerTool(
    name,
    {
      title: 'Get Post Comments',
      description: 'Get all comments for a specific post ID',
      inputSchema: toolArgSchema,
    },
    (args) => {
      const validatedArgs = toolArgSchema.safeParse(args);
      if (!validatedArgs.success) throw new Error(`Invalid args format: ${validatedArgs.error.message}`);
      const postId = validatedArgs.data.postId;

      const postComments = comments.filter((comment) => comment.postId === postId);
      // all posts have comments
      if (!postComments) throw new Error(`Unknown post ID ${[postId]}`);

      return {
        content: [
          {
            type: 'text',
            text: encode(postComments),
          },
        ],
      };
    }
  );
};
