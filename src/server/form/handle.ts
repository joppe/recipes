import { Fields, Files } from 'formidable';
import formidable from 'formidable-serverless';
import { NextApiRequest } from 'next';

import { remove } from '../file/remove';
import { upload } from '../file/upload';

type Uploads = { [name: string]: string };

const DELETE_PREFIX = 'DELETE__';

async function deleteFiles(fields: Fields) {
    for (const name in fields) {
        // eslint-disable-next-line no-prototype-builtins
        if (fields.hasOwnProperty(name) && name.indexOf(DELETE_PREFIX) === 0) {
            try {
                await remove(fields[name] as string);
            } catch (e) {
                // it doesn't matter if it cannot be deleted
            }
        }
    }
}

async function uploadFiles(files: Files): Promise<Uploads> {
    const uploads: Uploads = {};

    for (const name in files) {
        // eslint-disable-next-line no-prototype-builtins
        if (!files.hasOwnProperty(name)) {
            continue;
        }

        uploads[name] = await upload(files[name].path);
    }

    return uploads;
}

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
                    await deleteFiles(fields);

                    const uploads = await uploadFiles(files);

                    const entity = Object.keys(uploads).reduce(
                        (acc: string, key: string): string => {
                            return acc.replace(key, uploads[key]);
                        },
                        <string>fields['entity'],
                    );
                    const input = <T>JSON.parse(entity);

                    resolve(input);
                } catch (err) {
                    return reject(err);
                }
            },
        );
    });
}
