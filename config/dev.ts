import path from 'path';

import type { UserConfigExport } from "@tarojs/cli";

export default {
  plugins: [
    path.resolve(__dirname, '../plugins/minifyMainPackage.ts'),
  ],
  logger: {
    quiet: false,
    stats: true
  },
  h5: {},
} satisfies UserConfigExport
