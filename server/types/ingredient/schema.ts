import { Schema } from 'mongoose';

export const ingredientSchema = new Schema({
    name: String,
    type: String,
    images: [String],
});
