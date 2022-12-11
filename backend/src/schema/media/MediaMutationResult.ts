import { Media } from '../../types';

export type MediaMutationResult = {
  media: Media | null;
  errors: { message: string }[];
};
