import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addInstruction } from '@/actions/instructions';
import { FormFields } from '@/components/recipes/instructions/FormFields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMain,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import {
  InstructionFormData,
  insertInstructionSchema as schema,
} from '@/db/schema';

type CreateProps = {
  recipeId: number;
  onFinish: () => void;
  onCancel: () => void;
};

export function Create({ recipeId, onFinish, onCancel }: CreateProps) {
  const { toast } = useToast();
  const form = useForm<InstructionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipeId,
      order: 10,
      description: '',
    },
  });

  async function handleSubmit(data: InstructionFormData) {
    await addInstruction(data);

    toast({
      title: 'Instruction created:',
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
          <DialogTitle>Add instruction</DialogTitle>
          <DialogDescription>Set the right value for order.</DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-instruction-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('recipeId')} />
              <FormFields control={form.control} />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-instruction-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
