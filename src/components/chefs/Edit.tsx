import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateChef } from '@/actions/chefs';
import { FormFields } from '@/components/chefs/FormFields';
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
import { Chef, ChefFormData, insertChefSchema as schema } from '@/db/schema';

type EditProps = {
  chef: Chef;
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ chef, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<ChefFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: chef.id,
      name: chef.name,
      skill: chef.skill,
    },
  });

  async function handleSubmit(data: ChefFormData) {
    await updateChef(data);

    toast({
      title: 'Chef updated:',
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
          <DialogTitle>Edit chef</DialogTitle>
          <DialogDescription>A chef needs to be unique.</DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-chef-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('id')} />
              <FormFields control={form.control} />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-chef-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
