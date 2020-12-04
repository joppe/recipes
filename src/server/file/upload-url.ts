import { BUCKET_NAME } from '../../config/cloud-storage';
import { factory } from './storage';

export async function uploadUrl(
    fileName: string,
    contentType: string,
    expires = Date.now() + 6000000,
): Promise<string> {
    const storage = factory();

    const data = await storage.bucket(BUCKET_NAME).file(fileName).getSignedUrl({
        action: 'write',
        expires,
        contentType,
    });

    return data[0];
}
