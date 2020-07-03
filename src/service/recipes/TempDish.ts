import { Dish } from './Dish';

export type TempDish = Omit<Dish, 'id'>;
