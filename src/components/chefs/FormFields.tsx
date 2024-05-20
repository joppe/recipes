import { Control } from 'react-hook-form';

import { SliderFormField } from '@/components/form/SliderFormField/SliderFormField';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChefFormData } from '@/db/schema';

type FormFieldsProps = {
  control: Control<ChefFormData>;
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
            <FormDescription>This is the name of the chef.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <SliderFormField
        control={control}
        name="skill"
        defaultValue={3}
        min={1}
        max={5}
        label="Skill"
        description="This is the kill level of the chef."
      />
    </>
  );
}
