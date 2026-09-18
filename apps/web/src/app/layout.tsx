import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Welcome to celluloid',
  description: 'Hello welcome to celluloid web app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
