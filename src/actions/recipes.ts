'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { RecipeFormData, recipes } from '@/db/schema';

export async function getRecipe(id: number) {
  return db.query.recipes.findFirst({
    with: {
      ingredients: {
        with: {
          product: true,
          unit: true,
        },
      },
      instructions: true,
    },
    where: (recipes, { eq }) => eq(recipes.id, id),
  });
}
export async function getRecipes() {
  return db.select().from(recipes).orderBy(recipes.name);
}

export async function addRecipe(recipe: RecipeFormData) {
  await db.insert(recipes).values(recipe);
}

export async function deleteRecipe(id: number) {
  await db.delete(recipes).where(eq(recipes.id, id));
}

export async function updateRecipe(recipe: RecipeFormData) {
  if (recipe.id === undefined) {
    throw new Error('Recipe ID is required');
  }

  await db.update(recipes).set(recipe).where(eq(recipes.id, recipe.id));
}
