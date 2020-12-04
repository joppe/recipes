import { Schema } from 'mongoose';

export const imageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
});
