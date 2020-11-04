import set from 'lodash/set';

const SKIP = /DELETE__|UPLOAD__/g;

export function hydrate<T>(formData: FormData): T {
    const data = {};

    for (const [key, value] of formData.entries()) {
        if (SKIP.test(key)) {
            continue;
        }

        set(data, key, value);
    }

    return data as T;
}
