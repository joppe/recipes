import { Storage } from '@google-cloud/storage';

const BASE_URL = 'https://storage.googleapis.com';
const BUCKET_NAME = 'recipe-images-2020';

export async function upload(path: string): Promise<string> {
    const storage = new Storage();
    const [file, rest] = await storage.bucket(BUCKET_NAME).upload(path, {
        gzip: true,
    });

    await file.makePublic();

    return `${BASE_URL}/${BUCKET_NAME}/${file.name}`;
}
