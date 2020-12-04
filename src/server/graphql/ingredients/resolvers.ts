import { ingredientService } from '../../type/ingredient/service';
import { Ingredient } from '../resolvers-types';

export const resolvers = {
    Query: {
        ingredients: async (): Promise<Ingredient[]> => {
            return (await ingredientService.getAll({
                name: 'asc',
            })) as Ingredient[];
        },
    },
};
