import { Storage } from '@google-cloud/storage';

const key = JSON.parse(process.env.GOOGLE_PRIVATE_KEY as string);

const storage = new Storage({
  projectId: key.project_id,
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key,
  },
});

export { storage };
