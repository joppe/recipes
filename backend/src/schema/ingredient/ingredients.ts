import { Ingredient } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server/Context';
import { IngredientType } from './IngredientType';

export const ingredients = {
  type: new GraphQLList(IngredientType),
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
