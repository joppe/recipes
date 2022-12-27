import { User } from '@prisma/client';

export type UserMutationResult = {
  user: User | null;
  errors: { message: string }[];
};
