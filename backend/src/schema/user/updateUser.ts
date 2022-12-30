import bcrypt from 'bcryptjs';
import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { UserMutationResult } from './UserMutationResult';
import { UserResultType } from './UserResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    email: string;
    password: string;
  };
};

const InputUpdateUserType = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const updateUser = {
  type: UserResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateUserType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<UserMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        user: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { name, email, password } = input;

    const user = await prisma.user.findUnique({ where: { id } });

    if (user === null) {
      return {
        user: null,
        errors: [{ message: `User with id "${id}" not found` }],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      user: updatedUser,
      errors: [],
    };
  },
};
