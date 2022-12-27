import { User } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { UserType } from './UserType';

type ResolveArgs = {
  id: string;
};

export const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
  },
};
