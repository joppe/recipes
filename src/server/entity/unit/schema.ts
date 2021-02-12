import { Schema } from 'mongoose';

export const unitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    description: String,
});
