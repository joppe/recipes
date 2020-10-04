import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../mongo/connect';

export default async function readUnits(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'GET') {
        return res.status(500).json({ msg: 'Only accept GET calls' });
    }

    await connect(
        async (db: Db): Promise<void> => {
            const collection = db.collection('units');
            const cursor = collection.find({});
            const results = await cursor.toArray();

            res.json({ units: results });
        },
    ).catch((err: Error) => {
        res.status(500).json({ msg: err.message });
    });
}
