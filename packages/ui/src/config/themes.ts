import { config as defaultConfig } from '@tamagui/config/v3';
import { brandColors } from './tokens';

const celluloid = {
  background: brandColors.bgBase,
  backgroundHover: brandColors.bgRaised,
  backgroundPress: brandColors.bgElevated,
  backgroundFocus: brandColors.bgElevated,
  backgroundStrong: brandColors.bgDeepest,
  backgroundTransparent: 'rgba(10,17,40,0)',

  color: brandColors.textPrimary,
  colorHover: brandColors.textPrimary,
  colorPress: brandColors.textPrimary,
  colorFocus: brandColors.textPrimary,

  borderColor: brandColors.bgBorder,
  borderColorHover: brandColors.bgBorderStrong,
  borderColorFocus: brandColors.accent6,
  borderColorPress: brandColors.bgBorderStrong,

  placeholderColor: brandColors.textMuted,
  outlineColor: brandColors.accent6,

  shadowColor: 'rgba(2,4,10,0.4)',
  shadowColorHover: 'rgba(2,4,10,0.55)',
};

const celluloid_accent = {
  background: brandColors.accent6,
  backgroundHover: brandColors.accent5,
  backgroundPress: brandColors.accent7,
  backgroundFocus: brandColors.accent7,
  backgroundStrong: brandColors.accent8,

  color: brandColors.textOnAccent,
  colorHover: brandColors.textOnAccent,
  colorPress: brandColors.textOnAccent,
  colorFocus: brandColors.textOnAccent,

  borderColor: brandColors.accent7,
  borderColorHover: brandColors.accent8,

  placeholderColor: brandColors.textOnAccent,
  outlineColor: brandColors.textOnAccent,

  shadowColor: 'rgba(2,4,10,0.25)',
  shadowColorHover: 'rgba(2,4,10,0.35)',
};

export const themes = {
  ...defaultConfig.themes,
  celluloid,
  celluloid_accent,
};
