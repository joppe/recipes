import { NextApiRequest, NextApiResponse } from 'next';

import { mealService } from '../../../server/entity/meal/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

interface DeleteMealRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteMeal(
    req: DeleteMealRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const success = await mealService.delete(req.body.id);

        if (success) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: 'Meal not found',
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('DELETE', deleteMeal));
