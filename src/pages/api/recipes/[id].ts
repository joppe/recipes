import { NextApiRequest, NextApiResponse } from 'next';

import { recipeService } from '../../../server/entity/recipe/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function readRecipe(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await recipeService.getById(req.query.id as string);

        res.json({ success: true, recipe: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readRecipe));
