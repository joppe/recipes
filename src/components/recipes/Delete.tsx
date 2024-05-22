import { deleteRecipe } from '@/actions/recipes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Recipe } from '@/db/schema';

type DeleteProps = {
  recipe: Recipe;
  onFinish: () => void;
  onCancel: () => void;
};

export function Delete({ recipe, onFinish, onCancel }: DeleteProps) {
  const { toast } = useToast();

  async function handleClick() {
    await deleteRecipe(recipe.id);

    toast({
      title: 'Recipe deleted:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(recipe, null, 2)}</code>
        </pre>
      ),
    });

    onFinish();
  }

  return (
    <AlertDialog
      open={true}
      onOpenChange={() => {
        onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            recipe from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onFinish}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
