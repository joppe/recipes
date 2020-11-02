import { Storage } from '@google-cloud/storage';

import { BUCKET_NAME } from '../../config/cloud-storage';

export async function remove(fileName: string): Promise<void> {
    const storage = new Storage();

    await storage.bucket(BUCKET_NAME).file(fileName).delete();
}
