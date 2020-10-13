import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { IngredientModel } from '../../../server/types/ingredient/model';

interface DeleteIngredientRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteIngredient(
    req: DeleteIngredientRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const query = { _id: req.body.id };
        const result = await IngredientModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ msg: 'Ingredient successfully deleted' });
        } else {
            res.status(500).json({ msg: 'Ingredient not deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated(
    'user',
    forceRequestMethod('DELETE', deleteIngredient),
);
