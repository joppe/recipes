import { Storage } from '@google-cloud/storage';

export function factory(): Storage {
    const { private_key } = JSON.parse(<string>process.env.GOOGLE_PRIVATE_KEY);

    return new Storage({
        projectId: <string>process.env.GOOGLE_PROJECT_ID,
        credentials: {
            client_email: <string>process.env.GOOGLE_CLIENT_EMAIL,
            private_key,
        },
    });
}
