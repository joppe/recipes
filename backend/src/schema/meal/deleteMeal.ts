import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { MealMutationResult } from './MealMutationResult';
import { MealResultType } from './MealResultType';

type ResolveArgs = {
  id: string;
};

export const deleteMeal = {
  type: MealResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<MealMutationResult> => {
    const meal = await prisma.meal.findUnique({ where: { id } });

    if (meal === null) {
      return {
        meal: null,
        errors: [{ message: `Meal with id "${id}" not found` }],
      };
    }

    await prisma.meal.delete({ where: { id } });

    return {
      meal,
      errors: [],
    };
  },
};
