import { Storage } from '@google-cloud/storage';

import { BUCKET_NAME } from '../../config/cloud-storage';

export async function upload(path: string): Promise<string> {
    const storage = new Storage();
    const [file, rest] = await storage.bucket(BUCKET_NAME).upload(path, {
        gzip: true,
    });

    await file.makePublic();

    return file.name;
}
