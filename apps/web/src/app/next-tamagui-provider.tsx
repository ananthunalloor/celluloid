'use client';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { TamaguiProvider } from '@org/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider
      skipNextHead
      defaultTheme="light"
      onChangeTheme={(next) => {
        setTheme(next as any);
      }}
    >
      <TamaguiProvider
        config={require('@org/ui').config}
        disableRootThemeClass
        defaultTheme={theme}
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
}
