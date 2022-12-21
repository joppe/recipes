import { PrismaClient, Recipe } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function recipesLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Recipe[]> {
    const recipes = await prisma.recipe.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Recipe>(ids as string[], recipes);
  }

  return new DataLoader<string, Recipe>(batchMedia);
}
