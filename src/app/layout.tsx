import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import Hotjar from '../components/analytics/Hotjar';
import ClientProviders from '../components/ClientProviders';
import { SmoothScrollProvider } from '../components/core/SmoothScrollProvider';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
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
  themeColor: '#7075e0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-foreground dark:text-white font-sans">
        <ClientProviders>
          <SmoothScrollProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
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
