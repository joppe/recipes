import { addDays, parseISO } from 'date-fns';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { MealModel } from '../../../server/type/meal/model';
import { RecipeModel } from '../../../server/type/recipe/model';

async function listMeals(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const from = parseISO(<string>req.query.from);
        const to = addDays(from, parseInt(<string>req.query.range, 10));

        await connect(url, options);

        // This is needed for the populate.
        RecipeModel.modelName;

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
