import { Schema } from 'mongoose';

export const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
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
            name: {
                type: String,
                required: true,
            },
            unit: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            preparation: String,
        },
    ],
});
