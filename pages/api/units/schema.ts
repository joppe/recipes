import { Schema } from 'mongoose';

export const unitSchema = new Schema({
    name: String,
    abbreviation: String,
});
