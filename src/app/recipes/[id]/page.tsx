'use client';

import { useEffect, useState } from 'react';

import { getProducts } from '@/actions/products';
import { getRecipe } from '@/actions/recipes';
import { getUnits } from '@/actions/units';
import { Loading } from '@/components/layout/loading/Loading';
import { Embed as EmbedIngredients } from '@/components/recipes/ingredients';
import { Embed as EmbedInstructions } from '@/components/recipes/instructions';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Recipe, Unit } from '@/db/schema';

enum DisplayMode {
  Idle = 'idle',
  List = 'list',
}

type RecipesProps = {
  params: {
    id: string;
  };
};

export default function Recipes({ params }: RecipesProps) {
  const id = parseInt(params.id, 10);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [units, setUnits] = useState<Unit[] | undefined>(undefined);
  const loading =
    recipe === undefined || products === undefined || units === undefined;

  useEffect(() => {
    async function fetchAll() {
      const products = await getProducts();
      const units = await getUnits();

      setProducts(products);
      setUnits(units);
    }

    void fetchAll();
  }, []);

  useEffect(() => {
    async function fetchRecipe() {
      const recipe = await getRecipe(id);

      setRecipe(recipe);
      setDisplayMode(DisplayMode.Idle);
    }

    if (displayMode === DisplayMode.List) {
      void fetchRecipe();
    }
  }, [displayMode, id]);

  return (
    <>
      {loading ? (
        <Card>
          <Loading />
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="mb-6">Recipe: {recipe.name}</CardTitle>
              <div>
                <dl className="divide-y divide-gray-100">
                  {[
                    ['Preparation time', `${recipe.preparationTime} minutes`],
                    ['Cooking time', `${recipe.cookingTime} minutes`],
                    ['Difficulty', recipe.difficulty],
                    ['Course', recipe.course],
                    ['Servings', recipe.servings],
                    ['Source', recipe.source],
                  ].map(([key, value]) => (
                    <div key={key} className="py-2">
                      <dt className="text-xs font-medium leading-6 text-gray-900">
                        {key}
                      </dt>
                      <dd className="mt-1 text-xs leading-6 text-gray-700">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </CardHeader>
          </Card>
          <EmbedInstructions
            recipe={recipe}
            onFinish={() => setDisplayMode(DisplayMode.List)}
            onCancel={() => setDisplayMode(DisplayMode.Idle)}
          />
          <EmbedIngredients
            recipe={recipe}
            products={products}
            units={units}
            onFinish={() => setDisplayMode(DisplayMode.List)}
            onCancel={() => setDisplayMode(DisplayMode.Idle)}
          />
        </>
      )}
    </>
  );
}
