import { ingredientService } from '../../type/ingredient/service';
import { Ingredient, Resolvers } from '../resolvers-types';

export const resolvers: Resolvers = {
    Query: {
        ingredients: async (): Promise<Ingredient[]> => {
            return (await ingredientService.getAll({
                name: 'asc',
            })) as Ingredient[];
        },
    },
};
