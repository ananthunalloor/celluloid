'use client';

import { TamaguiProvider, config } from '@org/ui';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="celluloid" disableInjectCSS>
      {children}
    </TamaguiProvider>
  );
}
