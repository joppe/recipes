import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateInstruction } from '@/actions/instructions';
import { FormFields } from '@/components/recipes/instructions/FormFields';
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
import {
  Instruction,
  InstructionFormData,
  insertInstructionSchema as schema,
} from '@/db/schema';

type EditProps = {
  instruction: Instruction;
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ instruction, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<InstructionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: instruction.id,
      recipeId: instruction.recipeId,
      order: instruction.order,
      description: instruction.description,
    },
  });

  async function handleSubmit(data: InstructionFormData) {
    await updateInstruction(data);

    toast({
      title: 'Instruction updated:',
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
          <DialogTitle>Edit instruction</DialogTitle>
          <DialogDescription>Set the right value for order.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-instruction-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <input type="hidden" {...form.register('id')} />
            <input type="hidden" {...form.register('recipeId')} />
            <FormFields control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-instruction-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
