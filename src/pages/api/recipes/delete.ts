import { NextApiRequest, NextApiResponse } from 'next';

import { recipeService } from '../../../server/entity/recipe/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

interface DeleteRecipeRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteRecipe(
    req: DeleteRecipeRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const success = await recipeService.delete(req.body.id);

        if (success) {
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

export default authenticated(
    'user',
    forceRequestMethod('DELETE', deleteRecipe),
);
