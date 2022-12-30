import { Meal } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';
import { MealType } from './MealType';

type ResolveArgs = {
  id: string;
};

export const meal = {
  type: MealType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<Meal | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.meal.findUnique({ where: { id } });
  },
};
