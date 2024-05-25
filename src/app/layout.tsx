import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';
import { SessionWrapper } from '@/components/auth/SessionWrapper';
import { MobileNavigation, Navigation } from '@/components/layout/navigation';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
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
    <SessionWrapper>
      <html lang="en">
        <body
          className={cn('bg-background font-sans antialiased', inter.variable)}
        >
          <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
              <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <Navigation />
              </aside>
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  <MobileNavigation />
                  {children}
                </div>
              </div>
            </div>
            <Toaster />
          </TooltipProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
