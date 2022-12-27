import { Recipe } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { RecipeType } from './RecipeType';

export const recipes = {
  type: new GraphQLList(RecipeType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Recipe[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.recipe.findMany();
  },
};
