import { addDays, parseISO } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

import { mealService } from '../../../server/entity/meal/service';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function listMeals(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const from = parseISO(<string>req.query.from);
        const to = addDays(from, parseInt(<string>req.query.range, 10));
        const result = await mealService.getForPeriod(from, to);

        res.json({ success: true, meals: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default forceRequestMethod('GET', listMeals);
