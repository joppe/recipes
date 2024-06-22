import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addIngredient } from '@/actions/ingredients';
import { FormFields } from '@/components/recipes/ingredients/FormFields';
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
  IngredientFormData,
  Product,
  Unit,
  insertIngredientSchema as schema,
} from '@/db/schema';

type CreateProps = {
  recipeId: number;
  products: Product[];
  units: Unit[];
  onFinish: () => void;
  onCancel: () => void;
};

export function Create({
  recipeId,
  products,
  units,
  onFinish,
  onCancel,
}: CreateProps) {
  const { toast } = useToast();
  const form = useForm<IngredientFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipeId,
      quantity: 1,
      preparation: '',
      productId: 0,
      unitId: 0,
    },
  });

  async function handleSubmit(data: IngredientFormData) {
    await addIngredient(data);

    toast({
      title: 'Ingredient created:',
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
          <DialogTitle>Add ingredient</DialogTitle>
          <DialogDescription>Set the right value for order.</DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-ingredient-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('recipeId')} />
              <FormFields
                control={form.control}
                products={products}
                units={units}
              />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-ingredient-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
