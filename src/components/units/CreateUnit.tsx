import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { addUnit } from '@/actions/units';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CreateUnitData, insertUserSchema as schema } from '@/db/schema';

type CreateUnitProps = {
  onFinish: () => void;
};

export function CreateUnit({ onFinish }: CreateUnitProps) {
  const { toast } = useToast();
  const form = useForm<CreateUnitData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      abbreviation: '',
    },
  });

  async function handleSubmit(data: CreateUnitData) {
    await addUnit(data);

    toast({
      title: 'Unit created:',
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
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>A unit needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-unit-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please type a name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the unit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abbreviation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abbreviation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please type an abbreviation"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the abbreviation of the unit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-unit-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
