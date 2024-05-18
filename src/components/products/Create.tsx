import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addProduct } from '@/actions/products';
import { FormFields } from '@/components/products/FormFields';
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
import { ProductFormData, insertProductSchema as schema } from '@/db/schema';

type CreateProps = {
  onFinish: () => void;
};

export function Create({ onFinish }: CreateProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function handleSubmit(data: ProductFormData) {
    await addProduct(data);

    toast({
      title: 'Product created:',
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
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>A product needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-product-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormFields control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-product-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
