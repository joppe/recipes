import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { IngredientModel } from '../../../server/type/ingredient/model';
import { validate } from '../../../server/type/ingredient/validate';
import { Ingredient } from '../../../types/ingredient.type';

interface CreateIngredientRequest extends NextApiRequest {
    body: {
        name: string;
    };
}

async function createIngredient(
    req: CreateIngredientRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input: Ingredient = await handle(req);
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                success: false,
                error: validateResult.error,
            });
        }

        const ingredient = new IngredientModel(input);

        await ingredient.save();

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authenticated(
    'user',
    forceRequestMethod('POST', createIngredient),
);
