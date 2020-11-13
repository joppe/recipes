import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { MealModel } from '../../../server/type/meal/model';

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
        await connect(url, options);

        const query = { _id: req.body.id };
        const result = await MealModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: `Meals deleted ${result.deletedCount}`,
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('DELETE', deleteMeal));
