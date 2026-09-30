import '../../public/tamagui.generated.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { ThemeProviders } from './providers';

export const metadata = {
  title: 'Welcome to celluloid',
  description: 'Hello welcome to celluloid web app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviders>{children}</ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
