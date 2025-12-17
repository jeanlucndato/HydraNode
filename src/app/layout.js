import './globals.css';

export const metadata = {
  title: 'VIBEWARE // C2 INITIALIZED',
  description: 'Advanced Offensive Operations Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
