import { BUCKET_NAME } from '../../config/cloud-storage';
import { factory } from './storage';

export async function signedUrl(
    fileName: string,
    contentType: string,
    action: 'delete' | 'write',
    expires: number,
): Promise<string> {
    const storage = factory();

    const data = await storage.bucket(BUCKET_NAME).file(fileName).getSignedUrl({
        action,
        expires,
        contentType,
    });

    return data[0];
}
