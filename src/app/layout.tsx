import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Meal Planner',
  description: 'Plan your meals for the week ahead.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('bg-background font-sans antialiased', inter.variable)}
      >
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          {children}
        </div>
      </body>
    </html>
  );
}
