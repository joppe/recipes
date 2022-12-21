import { Meal } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { MealType } from './MealType';

export const meals = {
  type: new GraphQLList(MealType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Meal[]> => {
    return await prisma.meal.findMany();
  },
};
