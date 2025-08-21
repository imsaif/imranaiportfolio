import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import './globals.css';
import Hotjar from '../components/analytics/Hotjar';
import PerformanceMonitor from '../components/analytics/PerformanceMonitor';
import ProductionPerformanceTest from '../components/analytics/ProductionPerformanceTest';
import ClientProviders from '../components/ClientProviders';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { SmoothScrollProvider } from '../components/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000'),
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
        {/* Preload critical resources for better LCP */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-black dark:text-white font-sans">
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
        <PerformanceMonitor />
        <ProductionPerformanceTest />
      </body>
    </html>
  );
}
