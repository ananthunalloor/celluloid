'use client';

import { TamaguiProvider, config } from '@org/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
