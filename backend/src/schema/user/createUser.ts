import bcrypt from 'bcryptjs';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server';
import { UserMutationResult } from './UserMutationResult';
import { UserResultType } from './UserResultType';

type ResolveArgs = {
  input: {
    name: string;
    email: string;
    password: string;
  };
};

const InputCreateUserType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const createUser = {
  type: UserResultType,
  args: {
    input: { type: InputCreateUserType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<UserMutationResult> => {
    const { name, email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser !== null) {
      return {
        user: null,
        errors: [
          {
            message: `There is already a user with the email address "${email}"`,
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      user: newUser,
      errors: [],
    };
  },
};
