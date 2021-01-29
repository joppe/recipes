import { NextApiRequest, NextApiResponse } from 'next';

import { recipeService } from '../../../server/entity/recipe/service';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function listRecipes(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await recipeService.getAll({ name: 'asc' });

        res.json({ success: true, recipes: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default forceRequestMethod('GET', listRecipes);
