import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { encode } from '@toon-format/toon';
import * as z from 'zod';

const users = (
  await import('../../data/users.json', {
    with: { type: 'json' },
  })
).default;

export const registerUserResources = (server: McpServer) => {
  const baseUri: string = 'resource://users';
  const idTemplate: string = `${baseUri}/{id}`;

  const resourceIdSchema = z.coerce
    .number()
    .int()
    .positive()
    .refine((val) => Number.isSafeInteger(val), { message: 'Resource ID exceeds safe integer range' });

  server.registerResource(
    'users',
    new ResourceTemplate(idTemplate, {
      // will populate the JSONRPC requests for 'resources/list' messages
      list: () => {
        const resources = users.map((user, index) => {
          return {
            name: `User Profile: ${user.name} - user ID: ${index}`,
            description: `Complete user profile for ${user.name}`,
            uri: `${baseUri}/${index}`,
          };
        });
        return {
          resources,
        };
      },
    }),
    {
      title: 'User Resource',
      description: 'Exposes user data via a resource template, resolving a user by numeric ID.',
      mimeType: 'text/plain',
    },
    async (uri, variables, _extra) => {
      const result = resourceIdSchema.safeParse(variables.id);
      if (!result.success) throw new Error(`Invalid id format: ${result.error.message}`);

      const user = users[result.data];
      if (!user) throw new Error(`Unknown user ID ${result.data}`);

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'plain/text', // [TODO] 'text/toon' when TOON will be official
            text: encode(user),
          },
        ],
      };
    }
  );
};
