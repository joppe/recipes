import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UnitModel } from '../../../server/types/unit/model';

interface DeleteUnitRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteUnit(
    req: DeleteUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const query = { _id: req.body.id };
        const result = await UnitModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ msg: 'Unit successfully deleted' });
        } else {
            res.status(500).json({ msg: 'Unit not deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated(forceRequestMethod('DELETE', deleteUnit));
