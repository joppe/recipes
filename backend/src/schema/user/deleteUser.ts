import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { UserMutationResult } from './UserMutationResult';
import { UserResultType } from './UserResultType';

type ResolveArgs = {
  id: string;
};

export const deleteUser = {
  type: UserResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<UserMutationResult> => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return {
        user: null,
        errors: [{ message: `User with id "${id}" not found` }],
      };
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      user,
      errors: [],
    };
  },
};
