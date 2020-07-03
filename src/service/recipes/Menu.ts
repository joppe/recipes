import { Recipe } from './Recipe';

export interface MenuEntry {
    date: Date;
    recipe: Recipe;
}

export interface Menu {
    days: MenuEntry[];
}
