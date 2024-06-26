import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateProduct } from '@/actions/products';
import { FormFields } from '@/components/products/FormFields';
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
  Product,
  ProductFormData,
  insertProductSchema as schema,
} from '@/db/schema';

type EditProps = {
  product: Product;
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ product, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.description,
    },
  });

  async function handleSubmit(data: ProductFormData) {
    await updateProduct(data);

    toast({
      title: 'Product updated:',
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
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>A product needs to be unique.</DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-product-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('id')} />
              <FormFields control={form.control} />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-product-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
