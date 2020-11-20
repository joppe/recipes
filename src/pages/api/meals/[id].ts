import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { MealModel } from '../../../server/type/meal/model';
import { RecipeModel } from '../../../server/type/recipe/model';

async function readMeal(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        // This is needed for the populate.
        RecipeModel.modelName;

        const query = MealModel.findById(req.query.id);

        query.populate('recipe');

        const result = await query.exec();

        res.json({ success: true, meal: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readMeal));
