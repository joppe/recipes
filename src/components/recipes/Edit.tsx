import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateRecipe } from '@/actions/recipes';
import { FormFields } from '@/components/recipes/FormFields';
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
  Recipe,
  RecipeFormData,
  insertRecipeSchema as schema,
} from '@/db/schema';

type EditProps = {
  recipe: Recipe;
  onFinish: () => void;
  onCancel: () => void;
};

export function Edit({ recipe, onFinish, onCancel }: EditProps) {
  const { toast } = useToast();
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: recipe.id,
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      course: recipe.course,
      servings: recipe.servings,
      source: recipe.source,
    },
  });

  async function handleSubmit(data: RecipeFormData) {
    await updateRecipe(data);

    toast({
      title: 'Recipe updated:',
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
          <DialogTitle>Edit recipe</DialogTitle>
          <DialogDescription>A recipe needs to be unique.</DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Form {...form}>
            <form
              className="grid gap-4 py-4"
              id="create-recipe-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <input type="hidden" {...form.register('id')} />
              <FormFields control={form.control} />
            </form>
          </Form>
        </DialogMain>
        <DialogFooter>
          <Button type="submit" form="create-recipe-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
