import { Recipe } from './recipe.type';

export type Meal = {
    _id?: string;
    date: string;
    name: string;
    chef?: string;
    recipe?: Recipe;
};
