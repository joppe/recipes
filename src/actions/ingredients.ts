'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { IngredientFormData, ingredients } from '@/db/schema';

export async function getIngredients() {
  return db.select().from(ingredients).orderBy(ingredients.id);
}

export async function addIngredient(ingredient: IngredientFormData) {
  await db.insert(ingredients).values(ingredient);
}

export async function deleteIngredient(id: number) {
  await db.delete(ingredients).where(eq(ingredients.id, id));
}

export async function updateIngredient(ingredient: IngredientFormData) {
  if (ingredient.id === undefined) {
    throw new Error('Ingredient ID is required');
  }

  await db
    .update(ingredients)
    .set(ingredient)
    .where(eq(ingredients.id, ingredient.id));
}
