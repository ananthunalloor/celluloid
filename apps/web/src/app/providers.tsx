'use client';

import { TamaguiProvider, config } from '@celluloid/ui';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="celluloid">
      {children}
    </TamaguiProvider>
  );
}
