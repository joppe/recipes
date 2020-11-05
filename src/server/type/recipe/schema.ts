import { Schema } from 'mongoose';

export const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    source: String,
    image: String,
    vegetarian: Boolean,
    vegan: Boolean,
    difficulty: Number,
    course: String,
    servings: Number,
    preparation_time: Number,
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
