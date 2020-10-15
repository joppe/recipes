import { Schema } from 'mongoose';

export const dishSchema = new Schema({
    recipe: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    chef: {
        type: String,
    },
});
