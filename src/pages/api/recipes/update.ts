import { NextApiRequest, NextApiResponse } from 'next';

import { recipeService } from '../../../server/entity/recipe/service';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { Recipe } from '../../../types/recipe.type';

async function updateRecipe(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Recipe = await handle(req);
        const result = await recipeService.update(input);

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
                msg: 'Recipe not found',
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

export default authenticated('user', forceRequestMethod('PUT', updateRecipe));
