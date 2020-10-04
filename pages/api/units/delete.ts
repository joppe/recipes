import { Db, ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../mongo/connect';

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

    await connect(
        async (db: Db): Promise<void> => {
            const collection = db.collection('units');
            const query = { _id: new ObjectID(req.body.id) };
            const result = await collection.deleteOne(query);

            if (result.deletedCount === 1) {
                res.json({ msg: 'success' });
            } else {
                res.status(500).json({ msg: 'Unit not deleted' });
            }
        },
    ).catch((err: Error) => {
        res.status(500).json({ msg: err.message });
    });
}
