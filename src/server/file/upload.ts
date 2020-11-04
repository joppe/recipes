import { BUCKET_NAME } from '../../config/cloud-storage';
import { factory } from './storage';

export async function upload(path: string): Promise<string> {
    const storage = factory();
    const [file, rest] = await storage.bucket(BUCKET_NAME).upload(path, {
        gzip: true,
    });

    await file.makePublic();

    return file.name;
}
