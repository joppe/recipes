import { NextApiRequest, NextApiResponse } from 'next';

import { ingredientService } from '../../../server/entity/ingredient/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function readIngredient(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await ingredientService.getById(req.query.id as string);

        res.json({ success: true, ingredient: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readIngredient));
