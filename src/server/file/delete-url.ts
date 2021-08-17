import { signedUrl } from './signed-url';

export async function uploadUrl(
    fileName: string,
    contentType: string,
    expires = Date.now() + 6000000,
): Promise<string> {
    return signedUrl(fileName, contentType, 'delete', expires);
}
