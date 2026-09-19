import { config as defaultConfig } from '@tamagui/config/v3';
import { createTamagui } from '@tamagui/core';

export const config = createTamagui(defaultConfig);

export default config;

type AppConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
