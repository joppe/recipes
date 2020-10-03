import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { dbName, url } from '../../../config/mongo';

export default function getUnits(
    req: NextApiRequest,
    res: NextApiResponse,
): void {
    if (req.method !== 'GET') {
        res.status(500).json({ msg: 'Only accept GET calls' });
    }

    MongoClient.connect(url, async (err, client) => {
        if (err !== null) {
            res.status(500).json({ msg: 'Could not connect to database' });
        }

        try {
            const db = client.db(dbName);
            const collection = db.collection('units');
            const cursor = collection.find({});
            const results = await cursor.toArray();

            res.json({ units: results });
        } finally {
            await client.close();
        }
    });
}
