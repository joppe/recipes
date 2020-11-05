export type Recipe = {
    _id?: string;
    name: string;
    description?: string;
    source?: string;
    image?: string;
    vegetarian?: boolean;
    vegan?: boolean;
    difficulty?: number;
    course?: string;
    servings?: number;
    preparation_time?: number;
    preparation: string[];
    ingredients: {
        name: string;
        unit: string;
        amount: number;
        preparation?: string;
    }[];
};
