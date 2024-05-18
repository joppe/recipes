import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateUnit } from '@/actions/units';
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
import { Unit, insertUserSchema as schema } from '@/db/schema';

type EditUnitProps = {
  unit: Unit;
  onFinish: () => void;
};

export function EditUnit({ unit, onFinish }: EditUnitProps) {
  const { toast } = useToast();
  const form = useForm<Unit>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: unit.id,
      name: unit.name,
      abbreviation: unit.abbreviation,
    },
  });

  async function handleSubmit(data: Unit) {
    await updateUnit(data);

    toast({
      title: 'Unit updated:',
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
          <DialogTitle>Edit unit</DialogTitle>
          <DialogDescription>A unit needs to be unique.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            id="create-unit-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <input type="hidden" {...form.register('id')} />
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
