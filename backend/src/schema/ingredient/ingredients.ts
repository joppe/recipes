import { Ingredient } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { IngredientType } from './IngredientType';

export const ingredients = {
  type: new GraphQLList(IngredientType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Ingredient[]> => {
    return await prisma.ingredient.findMany();
  },
};
