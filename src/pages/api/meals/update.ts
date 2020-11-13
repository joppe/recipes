import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { MealModel } from '../../../server/type/meal/model';
import { validate } from '../../../server/type/meal/validate';
import { Meal } from '../../../types/meal.type';

async function updateMeal(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input: Meal = await handle(req);
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                success: false,
                error: validateResult.error,
            });
        }

        const filter = { _id: input._id };
        const result = await MealModel.updateOne(filter, input);

        if (result.nModified === 1) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: `Meals updated ${result.nModified}`,
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
