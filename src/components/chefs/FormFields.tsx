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
import { Slider } from '@/components/ui/slider';
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
      <FormField
        control={control}
        name="skill"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Skill</FormLabel>
            <FormControl>
              <Slider
                min={1}
                max={5}
                step={1}
                defaultValue={[value]}
                onValueChange={(values) => {
                  onChange(values[0]);
                }}
              />
            </FormControl>
            <FormDescription>
              This is the kill level of the chef.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
