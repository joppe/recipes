'use client';

import { CalendarDays, ChefHat, DraftingCompass, Salad } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ITEMS = [
  {
    href: '/',
    icon: CalendarDays,
    label: 'Calendar',
  },
  {
    href: '/units',
    icon: DraftingCompass,
    label: 'Units',
  },
  {
    href: '/products',
    icon: Salad,
    label: 'Products',
  },
  {
    href: '/chefs',
    icon: ChefHat,
    label: 'Chefs',
  },
];

const ACTIVE_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8';

const CLASS =
  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      {ITEMS.map(({ href, icon: Icon, label }) => (
        <Tooltip key={href}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={pathname === href ? ACTIVE_CLASS : CLASS}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}
