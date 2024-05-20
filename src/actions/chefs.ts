'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { ChefFormData, chefs } from '@/db/schema';

export async function getChefs() {
  return db.select().from(chefs).orderBy(chefs.name);
}

export async function addChef(chef: ChefFormData) {
  await db.insert(chefs).values(chef);
}

export async function deleteChef(id: number) {
  await db.delete(chefs).where(eq(chefs.id, id));
}

export async function updateChef(chef: ChefFormData) {
  if (chef.id === undefined) {
    throw new Error('Chef ID is required');
  }

  await db.update(chefs).set(chef).where(eq(chefs.id, chef.id));
}
