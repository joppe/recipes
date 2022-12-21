import { Meal } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
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
    { prisma }: Context,
  ): Promise<Meal | null> => {
    return await prisma.meal.findUnique({ where: { id } });
  },
};
