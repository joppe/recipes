import { Product } from '../../types/Product';

export type ProductMutationResult = {
  product: Product | null;
  errors: { message: string }[];
};
