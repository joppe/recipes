import { Ingredient, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function ingredientsLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Ingredient[]> {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Ingredient>(ids as string[], ingredients);
  }

  return new DataLoader<string, Ingredient>(batchMedia);
}
