import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
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
        connect(url, options);

        const query = { _id: req.body.id };
        const result = await UnitModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ msg: 'Unit successfuly deleted' });
        } else {
            res.status(500).json({ msg: 'Unit not deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default async function (
    req: DeleteUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    await forceRequestMethod(req, res, 'DELETE', deleteUnit);
}
