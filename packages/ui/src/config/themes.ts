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
  background: brandColors.accent7,
  backgroundHover: brandColors.accent8,
  backgroundPress: brandColors.accent9,
  backgroundFocus: brandColors.accent8,
  backgroundStrong: brandColors.accent9,

  color: brandColors.textOnAccent,
  colorHover: brandColors.textOnAccent,
  colorPress: brandColors.textOnAccent,
  colorFocus: brandColors.textOnAccent,

  borderColor: brandColors.accent8,
  borderColorHover: brandColors.accent9,

  placeholderColor: brandColors.textOnAccent,
  outlineColor: brandColors.textOnAccent,

  shadowColor: 'rgba(2,4,10,0.25)',
  shadowColorHover: 'rgba(2,4,10,0.35)',
};

const celluloid_complementary = {
  background: brandColors.warning,
  backgroundHover: brandColors.warningStrong,
  backgroundPress: brandColors.warningStrong,
  backgroundFocus: brandColors.warningStrong,
  backgroundStrong: brandColors.warningStrong,

  color: brandColors.textOnComplementary,
  colorHover: brandColors.textOnComplementary,
  colorPress: brandColors.textOnComplementary,
  colorFocus: brandColors.textOnComplementary,

  borderColor: brandColors.warningStrong,
  borderColorHover: brandColors.warningStrong,

  placeholderColor: brandColors.textOnComplementary,
  outlineColor: brandColors.textOnComplementary,

  shadowColor: 'rgba(2,4,10,0.25)',
  shadowColorHover: 'rgba(2,4,10,0.35)',
};

export const themes = {
  ...defaultConfig.themes,
  celluloid,
  celluloid_accent,
  celluloid_complementary,
};
