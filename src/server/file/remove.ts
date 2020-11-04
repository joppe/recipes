import { BUCKET_NAME } from '../../config/cloud-storage';
import { factory } from './storage';

export async function remove(fileName: string): Promise<void> {
    const storage = factory();

    await storage.bucket(BUCKET_NAME).file(fileName).delete();
}
