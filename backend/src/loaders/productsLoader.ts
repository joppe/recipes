import { PrismaClient, Product } from '@prisma/client';
import DataLoader from 'dataloader';

import { orderRecords } from './orderRecords';

export function productsLoader(prisma: PrismaClient) {
  async function batchMedia(ids: readonly string[]): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return orderRecords<Product>(ids as string[], products);
  }

  return new DataLoader<string, Product>(batchMedia);
}
