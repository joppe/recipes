import { Recipe } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { RecipeType } from './RecipeType';

export const recipes = {
  type: new GraphQLList(RecipeType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Recipe[]> => {
    return await prisma.recipe.findMany();
  },
};
