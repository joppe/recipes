import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { CreateUnitData, insertUserSchema as schema } from '@/db/schema';

type CreateUnitProps = {
  onSubmit: (data: CreateUnitData) => Promise<void>;
};

export function CreateUnit({ onSubmit }: CreateUnitProps) {
  const form = useForm<CreateUnitData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      abbreviation: '',
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid gap-4 py-4"
        id="create-unit-form"
        onSubmit={form.handleSubmit(onSubmit)}
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
              <FormDescription>This is the name of the unit.</FormDescription>
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
                <Input placeholder="Please type an abbreviation" {...field} />
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
  );
}
