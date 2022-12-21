import { PrismaClient, Unit } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function unitsLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Unit[]> {
    const units = await prisma.unit.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Unit>(ids as string[], units);
  }

  return new DataLoader<string, Unit>(batchMedia);
}
