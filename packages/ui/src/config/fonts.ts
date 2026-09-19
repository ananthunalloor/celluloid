import { createFont } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';

const size = {
  1: 12,
  2: 13,
  3: 14,
  4: 16,
  5: 18,
  6: 20,
  7: 24,
  8: 28,
  9: 32,
  10: 40,
  11: 48,
  12: 60,
};

const lineHeight = {
  1: 16,
  2: 18,
  3: 20,
  4: 22,
  5: 26,
  6: 28,
  7: 32,
  8: 36,
  9: 40,
  10: 48,
  11: 56,
  12: 68,
};

const weight = {
  4: '400',
  5: '500',
  6: '600',
  7: '700',
  8: '800',
};

const letterSpacing = {
  4: 0,
  8: -0.2,
  12: -0.5,
};

const bodyFont = createFont({
  family: 'System',
  size,
  lineHeight,
  weight,
  letterSpacing,
});

const headingFont = createFont({
  family: 'System',
  size,
  lineHeight,
  weight: { 6: '600', 7: '700', 8: '800', 9: '800' },
  letterSpacing: { ...letterSpacing, 9: -0.5, 12: -1 },
});

export const fonts = {
  ...defaultConfig.fonts,
  body: bodyFont,
  heading: headingFont,
};
