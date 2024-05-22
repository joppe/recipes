import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateUnit } from '@/actions/units';
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
import { Unit, UnitFormData, insertUnitSchema as schema } from '@/db/schema';

type EditProps = {
  unit: Unit;
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ unit, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<UnitFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: unit.id,
      name: unit.name,
      abbreviation: unit.abbreviation,
    },
  });

  async function handleSubmit(data: UnitFormData) {
    await updateUnit(data);

    toast({
      title: 'Unit updated:',
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
        onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit unit</DialogTitle>
          <DialogDescription>A unit needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-unit-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <input type="hidden" {...form.register('id')} />
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
