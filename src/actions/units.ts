'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { CreateUnitData, Unit, units } from '@/db/schema';

export async function getUnits() {
  return db.select().from(units).orderBy(units.name);
}

export async function addUnit(unit: CreateUnitData) {
  await db.insert(units).values(unit);
}

export async function deleteUnit(id: number) {
  await db.delete(units).where(eq(units.id, id));
}

export async function updateUnit(unit: Unit) {
  await db.update(units).set(unit).where(eq(units.id, unit.id));
}
