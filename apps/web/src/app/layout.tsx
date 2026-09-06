import './global.css';

export const metadata = {
  title: 'Welcome to celluloid',
  description: 'Hello welcome to celluloid web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
