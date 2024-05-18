import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { FormFields } from '@/components/units/FormFields';
import { UnitFormData, insertUnitSchema as schema } from '@/db/schema';

type CreateProps = {
  onFinish: () => void;
};

export function Create({ onFinish }: CreateProps) {
  const { toast } = useToast();
  const form = useForm<UnitFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      abbreviation: '',
    },
  });

  async function handleSubmit(data: UnitFormData) {
    await addUnit(data);

    toast({
      title: 'Unit created:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    onFinish();
  }

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        onFinish();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>A unit needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-unit-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormFields control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-unit-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
