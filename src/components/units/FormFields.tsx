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
import { UnitFormData } from '@/db/schema';

type FormFieldsProps = {
  control: Control<UnitFormData>;
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
            <FormDescription>This is the name of the unit.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="abbreviation"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Abbreviation</FormLabel>
            <FormControl>
              <Input
                placeholder="Please type an abbreviation"
                defaultValue={value === null ? '' : value}
                onChange={onChange}
              />
            </FormControl>
            <FormDescription>
              This is the abbreviation of the unit.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
