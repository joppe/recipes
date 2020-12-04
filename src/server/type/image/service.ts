import { connect } from 'mongoose';

import { options, url } from '../../../config/mongoose';
import { Image } from '../../../types/image.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ImageModel } from './model';
import { validate } from './validate';

type SortBy = {
    [key: string]: 'asc' | 'desc';
};

export const imageService = {
    async getById(id: string): Promise<Image> {
        await connect(url, options);

        return ImageModel.findById(id);
    },
    async getAll(sortBy: SortBy): Promise<Image[]> {
        await connect(url, options);

        const query = ImageModel.find({});
        query.sort(sortBy);

        return query.exec();
    },
    async create(input: Image): Promise<ValidationError<Image> | void> {
        await connect(url, options);

        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        const ingredient = new ImageModel(input);

        await ingredient.save();
    },
    async update(input: Image): Promise<ValidationError<Image> | boolean> {
        await connect(url, options);

        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        const filter = { _id: input._id };
        const result = await ImageModel.updateOne(filter, input);

        return result.nModified === 1;
    },
    async delete(id: string): Promise<boolean> {
        await connect(url, options);

        const query = { _id: id };
        const result = await ImageModel.deleteOne(query);

        return result.deletedCount === 1;
    },
};
