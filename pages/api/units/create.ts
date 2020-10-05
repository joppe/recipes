import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UnitModel } from '../../../server/types/unit/model';

interface CreateUnitRequest extends NextApiRequest {
    body: {
        name: string;
        abbreviation: string;
    };
}

async function createUnit(
    req: CreateUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const unit = new UnitModel({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
        });

        await unit.save();

        res.json({ msg: 'Unit successfully created' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default async function (
    req: CreateUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    await forceRequestMethod(req, res, 'POST', createUnit);
}
