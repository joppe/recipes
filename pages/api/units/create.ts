import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../mongo/connect';
import { Unit } from '../../../types/unit.type';

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

    await connect(
        async (db: Db): Promise<void> => {
            const collection = db.collection('units');
            const doc: Unit = {
                name: req.body.name,
                abbreviation: req.body.abbreviation,
            };
            const result = await collection.insertOne(doc);

            res.json({
                msg: `${result.insertedCount} documents were insterted with the _id: ${result.insertedId}`,
            });
        },
    ).catch((err: Error) => {
        res.status(500).json({ msg: err.message });
    });
}
