import { Ingredient } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';
import { IngredientType } from './IngredientType';

type ResolveArgs = {
  id: string;
};

export const ingredient = {
  type: IngredientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<Ingredient | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.ingredient.findUnique({ where: { id } });
  },
};
