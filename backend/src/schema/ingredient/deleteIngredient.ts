import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';
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
    { prisma, userInfo }: Context,
  ): Promise<IngredientMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        ingredient: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

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
