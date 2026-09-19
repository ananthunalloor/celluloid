import '../tamagui.generated.css';

import { ThemeProviders } from './providers';

export const metadata = {
  title: 'Welcome to celluloid',
  description: 'Hello welcome to celluloid web app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
