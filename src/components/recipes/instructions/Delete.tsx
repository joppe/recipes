import { deleteInstruction } from '@/actions/instructions';
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
import { Instruction } from '@/db/schema';

type DeleteProps = {
  instruction: Instruction;
  onFinish: () => void;
};

export function Delete({ instruction, onFinish }: DeleteProps) {
  const { toast } = useToast();

  async function handleClick() {
    await deleteInstruction(instruction.id);

    toast({
      title: 'Instruction deleted:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(instruction, null, 2)}
          </code>
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
            instruction from the database.
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