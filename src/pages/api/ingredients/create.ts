import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { IngredientModel } from '../../../server/types/ingredient/model';

interface CreateIngredientRequest extends NextApiRequest {
    body: {
        name: string;
        type: string;
    };
}

async function createIngredient(
    req: CreateIngredientRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const ingredient = new IngredientModel({
            name: req.body.name,
            type: req.body.type,
            images: [],
        });

        await ingredient.save();

        res.json({ msg: 'Ingredient successfully created' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated(forceRequestMethod('POST', createIngredient));
