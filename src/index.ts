import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'mcp-sample',
  version: '1.0.0',
  capabilities: {
    tools: {},
  },
});

server.tool(
  'generate_uuid',
  'Generate random UUIDs',
  {
    count: z.number().int().positive().default(1).describe('Number of UUIDs to generate'),
  },
  async ({ count }) => {
    const uuids = Array.from({ length: count }, () => crypto.randomUUID());

    return {
      content: [
        {
          type: 'text',
          text: uuids.join('\n'),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
