import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';
import ClientProviders from '../components/ClientProviders';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

// Create a client-side Providers component

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
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-black dark:text-white">
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
