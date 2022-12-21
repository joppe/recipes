import { Chef } from '@prisma/client';

export type ChefMutationResult = {
  chef: Chef | null;
  errors: { message: string }[];
};
