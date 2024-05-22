import { Control } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Chef, MealFormData, Recipe } from '@/db/schema';

type FormFieldsProps = {
  chefs: Chef[];
  recipes: Recipe[];
  control: Control<MealFormData>;
};

export function FormFields({ control, chefs, recipes }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="recipeId"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Recipe</FormLabel>
            <Select
              onValueChange={(newValue) => onChange(parseInt(newValue, 10))}
              defaultValue={String(value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a recipe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {recipes.map((recipe) => (
                  <SelectItem key={recipe.id} value={String(recipe.id)}>
                    {recipe.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>The recipe for the meal.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="chefId"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <Select
              onValueChange={(newValue) => onChange(parseInt(newValue, 10))}
              defaultValue={String(value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a chef" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {chefs.map((chef) => (
                  <SelectItem key={chef.id} value={String(chef.id)}>
                    {chef.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The chef that will prepare the meal.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
