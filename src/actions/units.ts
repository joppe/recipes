'use server';

import db from '@/db/drizzle';
import { CreateUnitData, units } from '@/db/schema';

export async function getUnits() {
  return db.select().from(units);
}

export async function addUnit(unit: CreateUnitData) {
  await db.insert(units).values(unit);
}
