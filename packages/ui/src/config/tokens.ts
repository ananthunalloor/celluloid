import { createTokens } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';

/**
 * The raw color values, exported on their own so themes.ts can use the
 * literal hex/rgba values directly. Tamagui does NOT auto-resolve a
 * '$tokenName' string inside a hand-written theme object — that only
 * happens for themes built through its own theme-builder pipeline, which
 * pre-bakes the var(--c-x) reference when the palette is built. A plain
 * object needs the literal value, so themes.ts imports this instead of
 * writing '$bgBase' as a string.
 */
export const brandColors = {
  // Background — dark blue, darkest to lightest surface
  bgDeepest: '#02040a',
  bgBase: '#0a1128',
  bgRaised: '#0d1730',
  bgElevated: '#122047',
  bgBorder: '#1a2c5c',
  bgBorderStrong: '#24397a',

  // Text — on the dark blue background, low to high emphasis
  textMuted: '#5b6a94',
  textSecondary: '#8fa0c9',
  textPrimary: '#e8eefc',
  textOnAccent: '#04101f',

  // Accent — light blue, for buttons, links, focus rings
  accent1: '#eaf6ff',
  accent2: '#c3e6ff',
  accent3: '#94d3ff',
  accent4: '#5fbcff',
  accent5: '#2fa3ff',
  accent6: '#1487e8', // primary accent
  accent7: '#0f6dbf',
  accent8: '#0b5596',

  // Semantic — unrelated to the color rebrand, kept stable
  success: '#22c55e',
  successStrong: '#16a34a',
  warning: '#eab308',
  warningStrong: '#ca8a04',
  danger: '#ef4444',
  dangerStrong: '#dc2626',
  info: '#3b82f6',
  infoStrong: '#2563eb',

  // Glass surfaces — semi-transparent, paired with GlassCard's blur
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
