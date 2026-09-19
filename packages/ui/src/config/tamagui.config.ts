import { config as defaultConfig } from '@tamagui/config/v3';
import { createTamagui } from '@tamagui/core';

import { tokens } from './tokens';
import { fonts } from './fonts';
import { themes } from './themes';

export const config = createTamagui({ ...defaultConfig, tokens, fonts, themes });

export default config;

type AppConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
