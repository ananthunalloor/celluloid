'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider, config } from '@celluloid/ui';

import { useAuthStore } from '../lib/auth';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="celluloid">
        {children}
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
