import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod';
import { baseUri as posts_baseUri } from '../resources/post-resources.js';
import { name as comments_per_view } from '../tools/comments-per-view.js';
import { name as get_post_comments } from '../tools/get-post-comments.js';

export const registerPostEngagementReportPrompt = (server: McpServer) => {
  const promptArgSchema = {
    postId: z.coerce
      .number()
      .int()
      .positive()
      .max(100)
      .describe('Post ID to analyze'),
  };

  server.registerPrompt(
    'post_engagement_report',
    {
      title: 'Analyze Post Engagement',
      description: "A prompot to analyze a user's posts and its comments and generate an engegement report",
      argsSchema: promptArgSchema,
    },
    (args) => {
      const result = promptArgSchema.postId.safeParse(args.postId);
      if (!result.success) throw new Error(`Invalid id format: ${result.error.message}`);
      const postId = result.data.toString();
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Analyze and generate an engagement report for post with ID ${postId}:

**Step 1: Load Post data**
First, load the resource "${posts_baseUri}/${postId}" to get the post details.

**Step 2: Get all comments on this post**
Use "${get_post_comments}" tool to fetch all comments on post with ID ${postId}

**Step 3: Calculate engagement metrics (comments per view estimate)**
Use "${comments_per_view}" tool for an accurate calculation.

**Step 4: Provide a Social Engagement report**
Finally produce a comprehensive report:
- Summarize overall engagement level`,
            },
          },
        ],
      };
    }
  );
};
