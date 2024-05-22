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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IngredientFormData, Product, Unit } from '@/db/schema';

type FormFieldsProps = {
  control: Control<IngredientFormData>;
  products: Product[];
  units: Unit[];
};

export function FormFields({ control, products, units }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="quantity"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Please type a quantity"
                defaultValue={value}
                onChange={(event) => onChange(event.target.valueAsNumber)}
              />
            </FormControl>
            <FormDescription>
              This is the amount of product needed for this recipe.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="preparation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preparation</FormLabel>
            <FormControl>
              <Input placeholder="Please type a preparation" {...field} />
            </FormControl>
            <FormDescription>
              This is the way the ingredient has to be prepared.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="productId"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <Select
              onValueChange={(newValue) => onChange(parseInt(newValue, 10))}
              defaultValue={String(value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={String(product.id)}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>The product to use.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="unitId"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Unit</FormLabel>
            <Select
              onValueChange={(newValue) => onChange(parseInt(newValue, 10))}
              defaultValue={String(value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={String(unit.id)}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>The unit to use.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
