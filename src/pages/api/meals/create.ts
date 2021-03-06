import { NextApiRequest, NextApiResponse } from 'next';

import { mealService } from '../../../server/entity/meal/service';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { Meal } from '../../../types/meal.type';

async function createMeal(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Meal = await handle(req);
        const result = await mealService.create(input);

        if (typeof result === 'object') {
            return res.json({
                success: false,
                error: result,
            });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authenticated('user', forceRequestMethod('POST', createMeal));
