import { User } from '@prisma/client';

import { Context } from '../../server';
import { UserType } from './UserType';

export const me = {
  type: UserType,
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<User | null> => {
    if (userInfo === null) {
      return null;
    }

    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
};
