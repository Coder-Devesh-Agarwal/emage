/// <reference path="./.sst/platform/config.d.ts" />

import { readdirSync } from 'node:fs';

export default $config({
  app(input) {
    return {
      name: 'emage',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
        },
      },
    };
  },
  async run() {
    if (!process.env.NAME) {
      throw new Error('NAME environment variable is required');
    }

    const outputs = {};

    for (const value of readdirSync('./src/infra')) {
      const result = await import('./src/infra/' + value);

      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
