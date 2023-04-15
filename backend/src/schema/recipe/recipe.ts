import { Recipe } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { RecipeType } from './RecipeType';

type ResolveArgs = {
  id: string;
};

export const recipe = {
  type: RecipeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<Recipe | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.recipe.findUnique({ where: { id } });
  },
};
