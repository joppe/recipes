import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { UnitModel } from './model';

export default async function readUnits(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'GET') {
        return res.status(500).json({ msg: 'Only accept GET calls' });
    }

    try {
        connect(url, options);

        const result = await UnitModel.find({});

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
