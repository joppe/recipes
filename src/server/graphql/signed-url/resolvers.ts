import { uploadUrl } from '../../file/upload-url';
import {
    MutationUploadUrlArgs,
    ResolversParentTypes,
    SignedUrl,
} from '../resolvers-types';

export const resolvers = {
    Mutation: {
        uploadUrl: async (
            _: ResolversParentTypes['Mutation'],
            { fileName, contentType }: MutationUploadUrlArgs,
        ): Promise<SignedUrl> => {
            return {
                url: await uploadUrl(fileName, contentType),
                fileName,
                contentType,
            };
        },
    },
};
