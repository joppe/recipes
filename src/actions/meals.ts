'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { MealFormData, meals } from '@/db/schema';

export async function getMeals() {
  return db.select().from(meals).orderBy(meals.id);
}

export async function addMeal(meal: MealFormData) {
  await db.insert(meals).values(meal);
}

export async function deleteMeal(id: number) {
  await db.delete(meals).where(eq(meals.id, id));
}

export async function updateMeal(meal: MealFormData) {
  if (meal.id === undefined) {
    throw new Error('Meal ID is required');
  }

  await db.update(meals).set(meal).where(eq(meals.id, meal.id));
}
