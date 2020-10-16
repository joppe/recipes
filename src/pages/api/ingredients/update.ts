import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { IngredientModel } from '../../../server/type/ingredient/model';
import { validate } from '../../../server/type/ingredient/validate';

interface UpdateIngredientRequest extends NextApiRequest {
    body: {
        id: string;
        name: string;
        type: string;
    };
}

async function updateIngredient(
    req: UpdateIngredientRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input = {
            name: req.body.name,
        };
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                success: false,
                error: validateResult.error,
            });
        }

        const filter = { _id: req.body.id };
        const result = await IngredientModel.updateOne(filter, input);

        if (result.nModified === 1) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: `Units updated ${result.nModified}`,
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated(
    'user',
    forceRequestMethod('PUT', updateIngredient),
);
