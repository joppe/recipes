import { NextApiRequest, NextApiResponse } from 'next';

import { ingredientService } from '../../../server/entity/ingredient/service';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function listIngredients(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await ingredientService.getAll({ name: 'asc' });

        res.json({ success: true, ingredients: result });
    } catch (err) {
        res.status(500).json({ success: true, msg: err.message });
    }
}

export default forceRequestMethod('GET', listIngredients);
