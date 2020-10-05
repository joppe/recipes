import { Schema } from 'mongoose';

export const recipeSchema = new Schema({
    name: String,
    description: String,
    source: String,
    images: [String],
    vegetarian: Boolean,
    vegan: Boolean,
    difficulty: Boolean,
    course: String,
    servings: Number,
    preparation_time: Boolean,
    preparation: [String],
    ingredients: [
        {
            name: String,
            unit: String,
            amount: Number,
        },
    ],
});
