module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          config: '../../packages/ui/src/config/tamagui.config.ts',
          components: ['tamagui', '@celluloid/ui'],
        },
      ],
    ],
  };
};
