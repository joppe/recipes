import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { UnitModel } from './model';

interface CreateUnitRequest extends NextApiRequest {
    body: {
        name: string;
        abbreviation: string;
    };
}

export default async function createUnit(
    req: CreateUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(500).json({ msg: 'Only accept POST calls' });
    }

    try {
        connect(url, options);

        const unit = new UnitModel({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
        });

        await unit.save();

        res.json({ msg: 'Unit successfuly created' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
