'use client';

import { TamaguiProvider, config } from '@celluloid/ui';
import { NextIntlClientProvider } from 'next-intl';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="celluloid">
      <NextIntlClientProvider locale="en">{children}</NextIntlClientProvider>
    </TamaguiProvider>
  );
}
