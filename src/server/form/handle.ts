import formidable from 'formidable-serverless';
import { NextApiRequest } from 'next';

import { upload } from '../file/upload';

export async function handle<T>(req: NextApiRequest): Promise<T> {
    return new Promise((resolve, reject): void => {
        const form = new formidable.IncomingForm();

        form.keepExtensions = true;
        form.parse(
            req,
            async (err, fields, files): Promise<void> => {
                if (err) {
                    return reject(err);
                }

                try {
                    const input = { ...fields };

                    for (const name in files) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (!files.hasOwnProperty(name)) {
                            continue;
                        }

                        input[name] = await upload(files[name].path);
                    }

                    resolve((input as unknown) as T);
                } catch (err) {
                    return reject(err);
                }
            },
        );
    });
}
