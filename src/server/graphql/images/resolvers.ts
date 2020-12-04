import { imageService } from '../../type/image/service';
import { Image } from '../resolvers-types';

export const resolvers = {
    Query: {
        images: async (): Promise<Image[]> => {
            return (await imageService.getAll({
                name: 'asc',
            })) as Image[];
        },
    },
};
