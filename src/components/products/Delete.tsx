import { deleteProduct } from '@/actions/products';
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
import { Product } from '@/db/schema';

type DeleteProps = {
  product: Product;
  onFinish: () => void;
};

export function Delete({ product, onFinish }: DeleteProps) {
  const { toast } = useToast();

  async function handleClick() {
    await deleteProduct(product.id);

    toast({
      title: 'Product deleted:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(product, null, 2)}</code>
        </pre>
      ),
    });

    onFinish();
  }

  return (
    <AlertDialog
      open={true}
      onOpenChange={() => {
        onFinish();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product from the database.
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
