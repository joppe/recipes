import { MealType } from './MealType';
import { Meal } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

export const meals = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MealType))),
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
