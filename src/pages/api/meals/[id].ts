import { NextApiRequest, NextApiResponse } from 'next';

import { mealService } from '../../../server/entity/meal/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function readMeal(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await mealService.getById(req.query.id as string);

        res.json({ success: true, meal: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readMeal));
