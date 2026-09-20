const nextConfig = {
  transpilePackages: [
    '@celluloid/ui',
    'tamagui',
    '@tamagui/core',
    'expo-blur',
  ],

  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    },
  },
};

module.exports = nextConfig;