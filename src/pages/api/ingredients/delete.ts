import { NextApiRequest, NextApiResponse } from 'next';

import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { ingredientService } from '../../../server/type/ingredient/service';

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
        const success = await ingredientService.delete(req.body.id);

        if (success) {
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

export default authenticated(
    'user',
    forceRequestMethod('DELETE', deleteIngredient),
);
