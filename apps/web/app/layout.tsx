import './global.css';

import AppProviders from 'apps/web/app/AppProviders';

import localFont from 'next/font/local';
import { Inter, Inter_Tight, Roboto_Mono } from 'next/font/google';

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const doto = localFont({
  src: '../src/fonts/doto.ttf',
  variable: '--font-doto',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClassNames = [
    interTight.variable,
    inter.variable,
    robotoMono.variable,
    doto.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontClassNames}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/document/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/document/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/document/favicon-16x16.png" />
        <link rel="manifest" href="/document/site.webmanifest" />
        <link rel="mask-icon" href="/document/safari-pinned-tab.svg" color="#0052ff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="flex flex-col min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
