import { FormData } from './FormData';

export type SubmitHandler<T extends FormData> = (
  data: T,
) => void | Promise<void>;
