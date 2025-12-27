import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { encode } from '@toon-format/toon';
import * as z from 'zod';

/* post ID = [1,100] */
const posts = (
  await import('../../data/posts.json', {
    with: { type: 'json' },
  })
).default;

export const registerPostResources = (server: McpServer) => {
  const baseUri: string = 'resource://posts';
  const idTemplate: string = `${baseUri}/{id}`;

  const resourceIdSchema = z.coerce
    .number()
    .int()
    .positive()
    .refine((val) => Number.isSafeInteger(val), { message: 'Resource ID exceeds safe integer range' });

  server.registerResource(
    'posts',
    new ResourceTemplate(idTemplate, {
      // will populate the JSONRPC requests for 'resources/list' messages
      list: () => {
        // ID = index + 1
        const resources = posts.map((post, index) => {
          return {
            name: `Post with ID: ${index + 1}`,
            description: `Title: ${post.title}`,
            uri: `${baseUri}/${index + 1}`,
          };
        });
        return {
          resources,
        };
      },
    }),
    {
      title: 'Post Resource',
      description: 'Exposes post data via a resource template, resolving a post by numeric ID.',
      mimeType: 'text/plain',
    },
    async (uri, variables, _extra) => {
      const result = resourceIdSchema.safeParse(variables.id);
      if (!result.success) throw new Error(`Invalid id format: ${result.error.message}`);

      // index = ID - 1
      const post = posts[result.data - 1];
      if (!post) throw new Error(`Unknown post ID ${result.data}`);

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'plain/text', // [TODO] 'text/toon' when TOON will be official
            text: encode(post),
          },
        ],
      };
    }
  );
};
