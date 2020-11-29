import { NextApiRequest, NextApiResponse } from 'next';

import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { ingredientService } from '../../../server/type/ingredient/service';

async function listIngredients(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const ingredients = await ingredientService.getAll({ name: 'asc' });

        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default forceRequestMethod('GET', listIngredients);
