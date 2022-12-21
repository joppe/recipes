import { Product } from '@prisma/client';

export type ProductMutationResult = {
  product: Product | null;
  errors: { message: string }[];
};
