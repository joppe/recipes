'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { UnitFormData, units } from '@/db/schema';

export async function getUnits() {
  return db.select().from(units).orderBy(units.name);
}

export async function addUnit(unit: UnitFormData) {
  await db.insert(units).values(unit);
}

export async function deleteUnit(id: number) {
  await db.delete(units).where(eq(units.id, id));
}

export async function updateUnit(unit: UnitFormData) {
  if (unit.id === undefined) {
    throw new Error('Unit ID is required');
  }

  await db.update(units).set(unit).where(eq(units.id, unit.id));
}
