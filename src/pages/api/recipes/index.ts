import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { RecipeModel } from '../../../server/type/recipe/model';

async function listRecipes(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const query = RecipeModel.find({});
        query.sort({ name: 'asc' });

        const result = await query.exec();

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default forceRequestMethod('GET', listRecipes);
