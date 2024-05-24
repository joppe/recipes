import { useRef } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

type SliderFormFieldProps<FormData extends FieldValues> = {
  control: Control<FormData>;
  name: Path<FormData>;
  defaultValue: number;
  min: number;
  max: number;
  label: string;
  description: string;
};

export function SliderFormField<FormData extends FieldValues>({
  control,
  name,
  defaultValue,
  min,
  max,
  label,
  description,
}: SliderFormFieldProps<FormData>) {
  const selectedRef = useRef<HTMLSpanElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const selected = !value ? defaultValue : value;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="text-xs text-muted-foreground">
              Selected: <span ref={selectedRef}>{selected}</span>
            </div>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={1}
                defaultValue={[!value ? 3 : value]}
                onValueChange={(values) => {
                  const newValue = values[0];

                  onChange(newValue);

                  if (selectedRef.current) {
                    selectedRef.current.innerText = String(newValue);
                  }
                }}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
