import { Media } from '@prisma/client';

export type MediaMutationResult = {
  media: Media | null;
  errors: { message: string }[];
};
