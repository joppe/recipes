import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { dbName, url } from '../../../config/mongo';
import { Unit } from '../../../types/unit.type';

export default function createUnit(
    req: NextApiRequest,
    res: NextApiResponse,
): void {
    if (req.method !== 'POST') {
        res.status(500).json({ msg: 'Only accept POST calls' });
    }

    MongoClient.connect(url, async (err, client) => {
        if (err !== null) {
            res.status(500).json({ msg: 'Could not connect to database' });
        }

        try {
            const db = client.db(dbName);
            const collection = db.collection('units');
            const doc: Unit = { name: 'Test', abbreviation: 'tst' };
            const result = await collection.insertOne(doc);

            console.log(
                `${result.insertedCount} documents were insterted with the _id: ${result.insertedId}`,
            );
        } finally {
            await client.close();
        }
    });
}
