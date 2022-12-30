import { GraphQLNonNull, GraphQLString } from 'graphql';
import { v4 as uuid } from 'uuid';

import { storage } from '../../file/storage';
import { Context } from '../../server/Context';
import { UploadUrl } from './UploadUrl';
import { UploadUrlType } from './UploadUrlType';

type ResolveArgs = {
  fileName: string;
  contentType: string;
};

export const createUploadUrl = {
  type: UploadUrlType,
  args: {
    fileName: { type: new GraphQLNonNull(GraphQLString) },
    contentType: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    { fileName: originalFileName, contentType }: ResolveArgs,
    { userInfo }: Context,
  ): Promise<UploadUrl> => {
    if (userInfo?.userId === undefined) {
      return {
        url: '',
        fileName: '',
      };
    }

    const [extension] = originalFileName.split('.').slice(-1);
    const fileName = `${uuid()}.${extension}`;
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
    const [url] = await storage
      .bucket(process.env.BUCKET_NAME as string)
      .file(fileName)
      .getSignedUrl({
        action: 'write',
        expires,
        contentType,
      });

    return {
      url,
      fileName,
    };
  },
};
