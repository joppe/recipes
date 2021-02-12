import { Schema } from 'mongoose';

export const mealSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    chef: {
        type: String,
        required: false,
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: false,
    },
});
