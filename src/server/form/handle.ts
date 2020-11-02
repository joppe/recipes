import formidable from 'formidable-serverless';
import { NextApiRequest } from 'next';

import { remove } from '../file/remove';
import { upload } from '../file/upload';

const DELETE_PREFIX = 'DELETE__';
const UPLOAD_PREFIX = 'UPLOAD__';

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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const input: any = {};

                    for (const name in fields) {
                        if (
                            // eslint-disable-next-line no-prototype-builtins
                            !fields.hasOwnProperty(name) ||
                            name.indexOf(UPLOAD_PREFIX) === 0
                        ) {
                            continue;
                        }

                        if (name.indexOf(DELETE_PREFIX) === 0) {
                            try {
                                await remove(fields[name] as string);
                            } catch (e) {
                                // it doesn't matter if it cannot be deleted
                            }

                            input[name.replace(DELETE_PREFIX, '')] = '';
                        } else {
                            input[name] = fields[name];
                        }
                    }

                    for (const name in files) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (!files.hasOwnProperty(name)) {
                            continue;
                        }

                        input[name.replace(UPLOAD_PREFIX, '')] = await upload(
                            files[name].path,
                        );
                    }

                    resolve(input as T);
                } catch (err) {
                    return reject(err);
                }
            },
        );
    });
}
