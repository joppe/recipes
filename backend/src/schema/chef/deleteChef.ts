import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

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
    { prisma, userInfo }: Context,
  ): Promise<ChefMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        chef: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

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
