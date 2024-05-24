import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addChef } from '@/actions/chefs';
import { FormFields } from '@/components/chefs/FormFields';
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
import { ChefFormData, insertChefSchema as schema } from '@/db/schema';

type CreateProps = {
  onFinish: () => void;
  onCancel: () => void;
};

export function Create({ onFinish, onCancel }: CreateProps) {
  const { toast } = useToast();
  const form = useForm<ChefFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      skill: 3,
    },
  });

  async function handleSubmit(data: ChefFormData) {
    await addChef(data);

    toast({
      title: 'Chef created:',
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
          <DialogTitle>Add chef</DialogTitle>
          <DialogDescription>A chef needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-chef-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormFields control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-chef-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
