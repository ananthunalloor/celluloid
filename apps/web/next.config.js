//@ts-check
const { withTamagui } = require('@tamagui/next-plugin');

const withTamaguiConfig = withTamagui({
  config: '../../packages/ui/src/config/tamagui.config.ts',
  components: ['tamagui', '@org/ui'],
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  transpilePackages: ['expo-blur'],
};

module.exports = withTamaguiConfig(nextConfig);
