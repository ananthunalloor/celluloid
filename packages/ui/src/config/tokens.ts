import { createTokens } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';

export const brandColors = {
  // Background — dark blue, darkest to lightest surface
  bgDeepest: '#02040a',
  bgBase: '#0a1128',
  bgRaised: '#0d1730',
  bgElevated: '#122047',
  bgBorder: '#1a2c5c',
  bgBorderStrong: '#24397a',
  textMuted: '#7889b3',
  textSecondary: '#8fa0c9',
  textPrimary: '#e8eefc',
  textOnAccent: '#f0f6ff',
  textOnComplementary: '#241a04',

  // Accent
  accent1: '#eaf6ff',
  accent2: '#c3e6ff',
  accent3: '#94d3ff',
  accent4: '#5fbcff',
  accent5: '#2fa3ff',
  accent6: '#1487e8', // link / inline accent text
  accent7: '#0f6dbf', // button default
  accent8: '#0b5596', // button hover
  accent9: '#073c68', // button pressed

  // Semantic
  success: '#22c55e',
  successStrong: '#16a34a',
  warning: '#eab308',
  warningStrong: '#ca8a04',
  danger: '#ef4444',
  dangerStrong: '#dc2626',
  info: '#3b82f6',
  infoStrong: '#2563eb',

  // Glass surfaces
  glassSurface: 'rgba(13, 23, 48, 0.55)',
  glassSurfaceStrong: 'rgba(13, 23, 48, 0.75)',
  glassBorder: 'rgba(148, 211, 255, 0.18)',
};

const color = {
  ...defaultConfig.tokens.color,
  ...brandColors,
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
  radius,
});
