import { FormData } from './FormData';

export type FormErrors<T extends FormData> = {
  [Property in keyof T]?: string;
};
