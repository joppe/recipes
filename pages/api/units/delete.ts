import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { UnitModel } from './model';

interface DeleteUnitRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

export default async function deleteUnit(
    req: DeleteUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'DELETE') {
        return res.status(500).json({ msg: 'Only accept DELETE calls' });
    }

    try {
        const query = { _id: req.body.id };

        connect(url, options);

        await UnitModel.deleteOne(query);

        res.json({ msg: 'Unit successfuly deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
