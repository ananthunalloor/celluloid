import { config as defaultConfig } from '@tamagui/config/v3';

const celluloid = {
  background: '$bgBase',
  backgroundHover: '$bgRaised',
  backgroundPress: '$bgElevated',
  backgroundFocus: '$bgElevated',
  backgroundStrong: '$bgDeepest',
  backgroundTransparent: 'rgba(10,17,40,0)',

  color: '$textPrimary',
  colorHover: '$textPrimary',
  colorPress: '$textPrimary',
  colorFocus: '$textPrimary',

  borderColor: '$bgBorder',
  borderColorHover: '$bgBorderStrong',
  borderColorFocus: '$accent6',
  borderColorPress: '$bgBorderStrong',

  placeholderColor: '$textMuted',
  outlineColor: '$accent6',

  shadowColor: 'rgba(2,4,10,0.4)',
  shadowColorHover: 'rgba(2,4,10,0.55)',
};

const celluloid_accent = {
  background: '$accent6',
  backgroundHover: '$accent5',
  backgroundPress: '$accent7',
  backgroundFocus: '$accent7',
  backgroundStrong: '$accent8',

  color: '$textOnAccent',
  colorHover: '$textOnAccent',
  colorPress: '$textOnAccent',
  colorFocus: '$textOnAccent',

  borderColor: '$accent7',
  borderColorHover: '$accent8',

  placeholderColor: '$textOnAccent',
  outlineColor: '$textOnAccent',

  shadowColor: 'rgba(2,4,10,0.25)',
  shadowColorHover: 'rgba(2,4,10,0.35)',
};

export const themes = {
  ...defaultConfig.themes,
  celluloid,
  celluloid_accent,
};
