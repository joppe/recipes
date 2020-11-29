import { connect } from 'mongoose';

import { options, url } from '../../../config/mongoose';
import { Ingredient } from '../../../types/ingredient.type';
import { ValidationError } from '../../../types/validation-error.type';
import { IngredientModel } from './model';
import { validate } from './validate';

type SortBy = {
    [key: string]: 'asc' | 'desc';
};

export const ingredientService = {
    async getById(id: string): Promise<Ingredient> {
        await connect(url, options);

        return IngredientModel.findById(id);
    },
    async getAll(sortBy: SortBy): Promise<Ingredient[]> {
        await connect(url, options);

        const query = IngredientModel.find({});
        query.sort(sortBy);

        return await query.exec();
    },
    async create(
        input: Ingredient,
    ): Promise<ValidationError<Ingredient> | void> {
        await connect(url, options);

        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        const ingredient = new IngredientModel(input);

        await ingredient.save();
    },
    async update(
        input: Ingredient,
    ): Promise<ValidationError<Ingredient> | boolean> {
        await connect(url, options);

        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        const filter = { _id: input._id };
        const result = await IngredientModel.updateOne(filter, input);

        return result.nModified === 1;
    },
    async delete(id: string): Promise<boolean> {
        await connect(url, options);

        const query = { _id: id };
        const result = await IngredientModel.deleteOne(query);

        return result.deletedCount === 1;
    },
};
