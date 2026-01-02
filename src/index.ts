import { argv, exit } from 'node:process';
import { error } from 'node:console';
import pkg from '../package.json' with { type: 'json' };

async function main() {
  switch (argv[2]) {
    case 'stdio':
      await import('./stdio/index.js');
      break;
    case 'http':
      await import('./streamableHttp/server.js');
      break;
    default:
      error(`McpMocker server v${pkg.version}`);
      error('Usage: node ./index.js [ stdio | http ]');
      error();
  }
}

main().catch((e) => {
  error('Script error: ', e);
  exit(1);
});
