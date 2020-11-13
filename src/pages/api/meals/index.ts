import { addDays, parseISO } from 'date-fns';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { MealModel } from '../../../server/type/meal/model';

async function listMeals(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const from = parseISO(req.body.from);
        const to = addDays(from, req.body.range);

        await connect(url, options);

        const query = MealModel.find({
            date: {
                $gte: from,
                $lte: to,
            },
        });
        query.populate('recipe');
        query.sort({ date: 'asc' });

        const result = await query.exec();

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default forceRequestMethod('GET', listMeals);
