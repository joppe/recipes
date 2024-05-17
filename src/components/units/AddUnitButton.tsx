'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { CreateUnit } from './CreateUnit';
import { addUnit } from '@/actions/units';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CreateUnitData } from '@/db/schema';

type AddUnitButtonProps = {
  refetch: () => Promise<void>;
};

export function AddUnitButton({ refetch }: AddUnitButtonProps) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);

  function toggleDialog() {
    setShowDialog((showDialog) => !showDialog);
  }

  async function handleSubmit(data: CreateUnitData) {
    await addUnit(data);
    await refetch();

    setShowDialog(false);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Button size="sm" className="h-8 gap-1" onClick={toggleDialog}>
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Unit
        </span>
      </Button>

      <Dialog open={showDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add unit</DialogTitle>
            <DialogDescription>A unit needs to be unique.</DialogDescription>
          </DialogHeader>
          <CreateUnit onSubmit={handleSubmit} />
          <DialogFooter>
            <Button type="submit" form="create-unit-form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
