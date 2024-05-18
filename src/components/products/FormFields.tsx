import { Control } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProductFormData } from '@/db/schema';

type FormFieldsProps = {
  control: Control<ProductFormData>;
};

export function FormFields({ control }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Please type a name" {...field} />
            </FormControl>
            <FormDescription>This is the name of the product.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please type an description"
                defaultValue={value === null ? '' : value}
                onChange={onChange}
              />
            </FormControl>
            <FormDescription>
              This is the abbreviation of the product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
