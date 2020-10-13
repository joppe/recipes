import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { IngredientModel } from '../../../server/types/ingredient/model';

interface UpdateIngredientRequest extends NextApiRequest {
    body: {
        id: string;
        name: string;
        type: string;
    };
}

async function updateIngredient(
    req: UpdateIngredientRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const filter = { _id: req.body.id };
        const doc = {
            name: req.body.name,
            type: req.body.type,
        };
        const result = await IngredientModel.updateOne(filter, doc);

        if (result.nModified === 1) {
            res.json({ msg: 'Ingredient successfully updated' });
        } else {
            res.status(500).json({ msg: 'Ingredient not updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated(
    'user',
    forceRequestMethod('PUT', updateIngredient),
);
