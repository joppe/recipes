import { IngredientType } from './IngredientType';
import { Ingredient } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

export const ingredients = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(IngredientType))),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Ingredient[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.ingredient.findMany();
  },
};
