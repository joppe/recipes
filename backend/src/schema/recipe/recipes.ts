import { Recipe } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { RecipeType } from './RecipeType';

export const recipes = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecipeType))),
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
