import { Schema } from 'mongoose';

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 40,
        required: true,
    },
    role: {
        required: String,
    },
});
