import { Product } from '../../types';

export type ProductMutationResult = {
  product: Product | null;
  errors: { message: string }[];
};
