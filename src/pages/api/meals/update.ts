import { NextApiRequest, NextApiResponse } from 'next';

import { mealService } from '../../../server/entity/meal/service';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { Meal } from '../../../types/meal.type';

async function updateMeal(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Meal = await handle(req);
        const result = await mealService.update(input);

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
                msg: 'Meals not found',
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

export default authenticated('user', forceRequestMethod('PUT', updateMeal));
