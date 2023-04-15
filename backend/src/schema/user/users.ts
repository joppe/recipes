import { User } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server/Context';

import { UserType } from './UserType';

export const users = {
  type: new GraphQLList(UserType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<User[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.user.findMany();
  },
};
