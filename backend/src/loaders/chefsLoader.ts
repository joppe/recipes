import { Chef, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function chefsLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Chef[]> {
    const chefs = await prisma.chef.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Chef>(ids as string[], chefs);
  }

  return new DataLoader<string, Chef>(batchMedia);
}
