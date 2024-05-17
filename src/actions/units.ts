'use server';

import db from '@/db/drizzle';
import { units } from '@/db/schema';

export async function getUnits() {
  return db.select().from(units);
}
