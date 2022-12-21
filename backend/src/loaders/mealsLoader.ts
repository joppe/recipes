import { Meal, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function mealsLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Meal>(ids as string[], meals);
  }

  return new DataLoader<string, Meal>(batchMedia);
}
