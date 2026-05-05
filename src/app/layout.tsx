import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Hotjar from '../components/analytics/Hotjar';
import ClientProviders from '../components/ClientProviders';
import { SmoothScrollProvider } from '../components/core/SmoothScrollProvider';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import './globals.css';

const satoshi = localFont({
  src: [
    { path: '../../public/fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://imranai.design' : 'http://localhost:3000'),
  title: 'Imran Mohammed | AI Experience Designer',
  description:
    'Product designer specializing in creating human-centered AI experiences that balance technical innovation with usability and ethics.',
  keywords: [
    'AI design',
    'UX design',
    'product design',
    'AI experience',
    'conversational UI',
    'ethical AI',
    'interaction design',
  ],
  authors: [{ name: 'Imran Mohammed' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#162036',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      </head>
      <body className="bg-background text-foreground font-sans">
        <ClientProviders>
          <SmoothScrollProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-14 md:pt-16">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ClientProviders>
        <SpeedInsights />
        <Analytics />
        <Hotjar />
      </body>
    </html>
  );
}
