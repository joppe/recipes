import { Media, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function mediaLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Media[]> {
    const media = await prisma.media.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Media>(ids as string[], media);
  }

  return new DataLoader<string, Media>(batchMedia);
}
