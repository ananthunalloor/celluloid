import { TamaguiBuildOptions } from '@celluloid/ui';

export default {
  config: './tamagui.config.ts',
  components: ['tamagui'],
  outputCSS: './public/tamagui.generated.css',
} satisfies TamaguiBuildOptions;
