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
import { InstructionFormData } from '@/db/schema';

type FormFieldsProps = {
  control: Control<InstructionFormData>;
};

export function FormFields({ control }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="order"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Order</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Please type an order"
                defaultValue={value}
                onChange={(event) => onChange(event.target.valueAsNumber)}
              />
            </FormControl>
            <FormDescription>
              This is the order of the instruction.
            </FormDescription>
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
              This is the description of the instruction.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
