import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

type AddButtonProps = {
  text: string;
  onClick: () => void;
};

export function AddButton({ text, onClick }: AddButtonProps) {
  return (
    <Button size="sm" className="h-8 gap-1" onClick={onClick}>
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {text}
      </span>
    </Button>
  );
}
