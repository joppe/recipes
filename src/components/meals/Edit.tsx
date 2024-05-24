import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateMeal } from '@/actions/meals';
import { FormFields } from '@/components/meals/FormFields';
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
  Chef,
  Meal,
  MealFormData,
  Recipe,
  insertMealSchema as schema,
} from '@/db/schema';

type EditProps = {
  meal: Meal;
  recipes: Recipe[];
  chefs: Chef[];
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ meal, chefs, recipes, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<MealFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: meal.id,
      recipeId: meal.recipeId,
      chefId: meal.chefId,
      date: meal.date,
    },
  });

  async function handleSubmit(data: MealFormData) {
    await updateMeal(data);

    toast({
      title: 'Meal updated:',
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
          <DialogTitle>Edit meal</DialogTitle>
          <DialogDescription>A meal needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-meal-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <input type="hidden" {...form.register('id')} />
            <input type="hidden" {...form.register('date')} />
            <FormFields
              control={form.control}
              recipes={recipes}
              chefs={chefs}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-meal-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
