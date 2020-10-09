import { Schema } from 'mongoose';

export const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    images: [String],
});
