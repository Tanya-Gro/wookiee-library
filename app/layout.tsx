import type { Metadata } from 'next';

import Layout from '@/src/components/layout/Layout';
import { Providers } from './providers';

import './global.css';

export const metadata: Metadata = {
  title: 'Wookiee Library',
  description: 'Educational project at RS school, React course',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </div>
      </body>
    </html>
  );
}
