import { Db, MongoClient } from 'mongodb';

import { dbName, url } from '../config/mongo';

type Handler = (db: Db) => Promise<void>;

export async function connect(handler: Handler): Promise<void> {
    const client = new MongoClient(url);

    await client.connect();

    try {
        const db = client.db(dbName);

        await handler(db);
    } finally {
        await client.close();
    }
}
