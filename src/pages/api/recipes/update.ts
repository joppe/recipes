import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { RecipeModel } from '../../../server/type/recipe/model';
import { validate } from '../../../server/type/recipe/validate';
import { Recipe } from '../../../types/recipe.type';

async function updateRecipe(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input: Recipe = await handle(req);
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                success: false,
                error: validateResult.error,
            });
        }

        const filter = { _id: input._id };
        const result = await RecipeModel.updateOne(filter, input);

        if (result.nModified === 1) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: `Recipes updated ${result.nModified}`,
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

export default authenticated('user', forceRequestMethod('PUT', updateRecipe));