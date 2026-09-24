const path = require('node:path');

const nextConfig = {
  output: 'standalone',

  // Without this, Next.js's standalone-output file tracing assumes this
  // app is the only package in the repo and can miss workspace-linked
  // packages like @celluloid/ui when it decides what to copy into
  // .next/standalone — the build succeeds but the runtime import fails.
  outputFileTracingRoot: path.join(__dirname, '../../'),

  transpilePackages: ['@celluloid/ui', 'tamagui', '@tamagui/core', 'expo-blur'],

  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    },
  },
};

module.exports = nextConfig;
