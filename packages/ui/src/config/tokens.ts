import { createTokens } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';

const color = {
  ...defaultConfig.tokens.color,

  // Background
  bgDeepest: '#02040a',
  bgBase: '#0a1128',
  bgRaised: '#0d1730',
  bgElevated: '#122047',
  bgBorder: '#1a2c5c',
  bgBorderStrong: '#24397a',

  // Text
  textMuted: '#5b6a94',
  textSecondary: '#8fa0c9',
  textPrimary: '#e8eefc',
  textOnAccent: '#04101f',

  // Accent colors
  accent1: '#eaf6ff',
  accent2: '#c3e6ff',
  accent3: '#94d3ff',
  accent4: '#5fbcff',
  accent5: '#2fa3ff',
  accent6: '#1487e8', // primary accent
  accent7: '#0f6dbf',
  accent8: '#0b5596',

  success: '#22c55e',
  successStrong: '#16a34a',
  warning: '#eab308',
  warningStrong: '#ca8a04',
  danger: '#ef4444',
  dangerStrong: '#dc2626',
  info: '#3b82f6',
  infoStrong: '#2563eb',

  // Glass surface
  glassSurface: 'rgba(13, 23, 48, 0.55)',
  glassSurfaceStrong: 'rgba(13, 23, 48, 0.75)',
  glassBorder: 'rgba(148, 211, 255, 0.18)',
};

const space = {
  ...defaultConfig.tokens.space,
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  true: 16,
};

const size = {
  ...defaultConfig.tokens.size,
  ...space,
};

const radius = {
  ...defaultConfig.tokens.radius,
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  full: 999,
  true: 12,
};

export const tokens = createTokens({
  ...defaultConfig.tokens,
  color,
  space,
  size,
  radius,
});
