import { Ingredient } from '@/db/schema';

type IngredientsProps = {
  ingredients: Ingredient[] | undefined;
};

export function Ingredients({ ingredients }: IngredientsProps) {
  if (ingredients === undefined || ingredients.length === 0) {
    return <p>No ingredients</p>;
  }

  return (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          {ingredient.quantity} {ingredient.unit?.name}{' '}
          {ingredient.product.name}
        </li>
      ))}
    </ol>
  );
}
