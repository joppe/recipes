import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useForm } from 'react-hook-form';

import { addMeal } from '@/actions/meals';
import { FormFields } from '@/components/meals/FormFields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogMain,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import {
  Chef,
  MealFormData,
  Recipe,
  insertMealSchema as schema,
} from '@/db/schema';

type CreateProps = {
  date: Date;
  recipes: Recipe[];
  chefs: Chef[];
  onFinish: () => void;
  onCancel: () => void;
};

export function Create({
  date,
  chefs,
  recipes,
  onFinish,
  onCancel,
}: CreateProps) {
  const { toast } = useToast();
  const form = useForm<MealFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: formatISO(date, { representation: 'date' }),
      recipeId: 0,
      chefId: 0,
    },
  });

  async function handleSubmit(data: MealFormData) {
    await addMeal(data);

    toast({
      title: 'Meal created:',
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
          <DialogTitle>Add meal</DialogTitle>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-meal-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('date')} />
              <FormFields
                control={form.control}
                chefs={chefs}
                recipes={recipes}
              />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-meal-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
