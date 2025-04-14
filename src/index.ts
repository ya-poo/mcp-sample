import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'mcp-sample',
  version: '1.0.0',
  capabilities: {
    tools: {},
  },
});

server.tool('generate_uuid', 'Generate random UUIDs', {}, async () => {
  return {
    content: [
      {
        type: 'text',
        text: crypto.randomUUID(),
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
