import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addRecipe } from '@/actions/recipes';
import { FormFields } from '@/components/recipes/FormFields';
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
import { RecipeFormData, insertRecipeSchema as schema } from '@/db/schema';

type CreateProps = {
  onFinish: () => void;
};

export function Create({ onFinish }: CreateProps) {
  const { toast } = useToast();
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      preparationTime: 15,
      cookingTime: 30,
      difficulty: 3,
      course: '',
      servings: 4,
      source: '',
    },
  });

  async function handleSubmit(data: RecipeFormData) {
    await addRecipe(data);

    toast({
      title: 'Recipe created:',
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
          <DialogTitle>Add recipe</DialogTitle>
          <DialogDescription>A recipe needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-recipe-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormFields control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-recipe-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
