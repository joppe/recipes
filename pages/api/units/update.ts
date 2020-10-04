import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { UnitModel } from './model';

interface CreateUnitRequest extends NextApiRequest {
    body: {
        id: string;
        name: string;
        abbreviation: string;
    };
}

export default async function createUnit(
    req: CreateUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'PUT') {
        return res.status(500).json({ msg: 'Only accept PUT calls' });
    }

    try {
        connect(url, options);

        const filter = { _id: req.body.id };
        const doc = {
            name: req.body.name,
            abbreviation: req.body.abbreviation,
        };
        const result = await UnitModel.updateOne(filter, doc);

        if (result.nModified === 1) {
            res.json({ msg: 'Unit successfuly updated' });
        } else {
            res.status(500).json({ msg: 'Unit not updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
