import { Document, FilterQuery, Model, connect } from 'mongoose';

import { options, url } from '../../config/mongoose';

export async function alreadyExists<T extends Document>(
    model: Model<T>,
    property: keyof T,
    value: string,
    id?: string,
): Promise<boolean> {
    await connect(url, options);

    const result = await model.findOne(<FilterQuery<T>>{ [property]: value });

    return (
        result !== null && (id === undefined || result._id.toString() !== id)
    );
}
