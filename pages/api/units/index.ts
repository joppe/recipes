import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UnitModel } from '../../../server/types/unit/model';

async function readUnit(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const result = await UnitModel.find({});

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default async function (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    await forceRequestMethod(req, res, 'GET', readUnit);
}
