import { Model, connect } from 'mongoose';

import { options, url } from '../../config/mongoose';
import { Document } from '../../types/document.type';
import { ValidationError } from '../../types/validation-error.type';
import { SortBy } from './sort';
import { Validator } from './validator';

export class Service<T extends Document> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected readonly model: Model<any>;
    protected readonly validator: Validator<T>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(model: Model<any>, validator: Validator<T>) {
        this.model = model;
        this.validator = validator;
    }

    public async getById(id: string): Promise<T | null> {
        await this.connect();

        return this.model.findById(id);
    }

    public async getAll(sortBy: SortBy): Promise<T[]> {
        await this.connect();

        const query = this.model.find();
        query.sort(sortBy);

        return query.exec();
    }

    public async create(input: T): Promise<ValidationError<T> | void> {
        await this.connect();

        const validateResult = await this.validator(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        await this.model.create(input);
    }

    public async update(input: T): Promise<ValidationError<T> | boolean> {
        await this.connect();

        const validateResult = await this.validator(input);

        if (!validateResult.isValid) {
            return validateResult.error;
        }

        const filter = { _id: input._id };
        const result = await this.model.updateOne(filter, input);

        return result.nModified === 1;
    }

    public async delete(id: string): Promise<boolean> {
        await this.connect();

        const query = { _id: id };
        const result = await this.model.deleteOne(query);

        return result.deletedCount === 1;
    }

    protected async connect(): Promise<void> {
        await connect(url, options);
    }
}
