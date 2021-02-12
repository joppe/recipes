import { Document } from './document.type';

export type Ingredient = Document & {
    _id?: string;
    name: string;
    image?: string;
    description?: string;
};
