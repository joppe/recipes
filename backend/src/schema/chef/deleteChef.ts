import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { ChefMutationResult } from './ChefMutationResult';
import { ChefResultType } from './ChefResultType';

type ResolveArgs = {
  id: string;
};

export const deleteChef = {
  type: ChefResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<ChefMutationResult> => {
    const chef = await prisma.chef.findUnique({ where: { id } });

    if (chef === null) {
      return {
        chef: null,
        errors: [{ message: `Chef with id "${id}" not found` }],
      };
    }

    await prisma.chef.delete({ where: { id } });

    return {
      chef,
      errors: [],
    };
  },
};
