import { NextApiRequest, NextApiResponse } from 'next';

import { ingredientService } from '../../../server/entity/ingredient/service';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { Ingredient } from '../../../types/ingredient.type';

async function updateIngredient(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Ingredient = await handle(req);
        const result = await ingredientService.update(input);

        if (typeof result === 'object') {
            return res.json({
                success: false,
                error: result,
            });
        }

        if (result) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: 'Ingredient not found',
            });
        }
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
    forceRequestMethod('PUT', updateIngredient),
);
