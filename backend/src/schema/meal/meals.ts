import { Meal } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { MealType } from './MealType';

export const meals = {
  type: new GraphQLList(MealType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Meal[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.meal.findMany();
  },
};
