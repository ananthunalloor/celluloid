const nextConfig = {
  transpilePackages: [
    '@org/ui',
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