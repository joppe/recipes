import { Meal } from './Meal';
import { Media } from './Media';

export type Chef = {
  id: string;
  name: string;
  skill: number;
  media: Media | null;
  meals: Meal[];
};
