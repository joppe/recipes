'use client';

import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ITEMS } from '@/components/layout/navigation/items';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ACTIVE_CLASS = 'flex items-center gap-4 px-2.5 text-foreground';

const CLASS =
  'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground';

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? ACTIVE_CLASS : CLASS}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
