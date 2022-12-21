import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { IngredientMutationResult } from './IngredientMutationResult';
import { IngredientResultType } from './IngredientResultType';

type ResolveArgs = {
  id: string;
};

export const deleteIngredient = {
  type: IngredientResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<IngredientMutationResult> => {
    const ingredient = await prisma.ingredient.findUnique({ where: { id } });

    if (ingredient === null) {
      return {
        ingredient: null,
        errors: [{ message: `Ingredient with id "${id}" not found` }],
      };
    }

    await prisma.ingredient.delete({ where: { id } });

    return {
      ingredient,
      errors: [],
    };
  },
};
