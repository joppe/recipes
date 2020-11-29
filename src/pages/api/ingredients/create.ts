import { NextApiRequest, NextApiResponse } from 'next';

import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { ingredientService } from '../../../server/type/ingredient/service';
import { Ingredient } from '../../../types/ingredient.type';

async function createIngredient(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Ingredient = await handle(req);
        const result = await ingredientService.create(input);

        if (typeof result === 'object') {
            return res.json({
                success: false,
                error: result,
            });
        }

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
