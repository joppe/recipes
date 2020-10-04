import { Db, ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../mongo/connect';
import { Unit } from '../../../types/unit.type';

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

    await connect(
        async (db: Db): Promise<void> => {
            const collection = db.collection('units');
            const filter = { _id: new ObjectID(req.body.id) };
            const options = { upsert: false };
            const doc: Unit = {
                name: req.body.name,
                abbreviation: req.body.abbreviation,
            };
            const update = {
                $set: doc,
            };
            const result = await collection.updateOne(filter, update, options);

            if (result.modifiedCount === 1) {
                res.json({
                    msg: `${result.matchedCount} documents matched the filter, update : ${result.modifiedCount}`,
                });
            } else {
                res.status(500).json({ msg: 'Unit not updated' });
            }
        },
    ).catch((err: Error) => {
        res.status(500).json({ msg: err.message });
    });
}
