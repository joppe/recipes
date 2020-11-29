import { NextApiRequest, NextApiResponse } from 'next';

import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { ingredientService } from '../../../server/type/ingredient/service';

async function readIngredient(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const ingredient = await ingredientService.getById(
            <string>req.query.id,
        );

        res.json({ success: true, ingredient });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readIngredient));
