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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecipeFormData } from '@/db/schema';

type FormFieldsProps = {
  control: Control<RecipeFormData>;
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
            <FormDescription>This is the name of the recipe.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="preparationTime"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Preparation time (in minutes)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Please type a perparation time"
                defaultValue={value === null ? '' : value}
                onChange={onChange}
              />
            </FormControl>
            <FormDescription>
              This is the amount of time in minutes to do preparations for this
              recipe.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cookingTime"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Cooking time (in minutes)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Please type a cooking time"
                defaultValue={value === null ? '' : value}
                onChange={onChange}
              />
            </FormControl>
            <FormDescription>
              This is the amount of time in minutes that takes to cook this
              recipe.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <SliderFormField
        control={control}
        name="difficulty"
        defaultValue={3}
        min={1}
        max={5}
        label="Difficulty"
        description="This is the difficulty level of the recipe."
      />
      <FormField
        control={control}
        name="course"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <Select
              onValueChange={onChange}
              defaultValue={value === null ? undefined : value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>This is the course of the recipe.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <SliderFormField
        control={control}
        name="servings"
        defaultValue={4}
        min={1}
        max={12}
        label="Servings"
        description="This is the amount of servings for this recipe."
      />
      <FormField
        control={control}
        name="source"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Source</FormLabel>
            <FormControl>
              <Input
                placeholder="Please type the source"
                value={value === null ? '' : value}
                onChange={onChange}
              />
            </FormControl>
            <FormDescription>The source of the recipe.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
