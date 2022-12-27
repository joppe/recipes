import { User } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { UserType } from './UserType';

export const users = {
  type: new GraphQLList(UserType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<User[]> => {
    return await prisma.user.findMany();
  },
};
