import bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import JWT from 'jsonwebtoken';

import { JWT_SECRET } from '../../auth/secret';
import { Context } from '../../server/Context';
import { LoginResult } from './LoginResult';
import { LoginResultType } from './LoginResultType';

type ResolveArgs = {
  email: string;
  password: string;
};

export const login = {
  type: LoginResultType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    { email, password }: ResolveArgs,
    { prisma }: Context,
  ): Promise<LoginResult> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      return {
        token: null,
        errors: [
          {
            message: `There is no user with the email address "${email}"`,
          },
        ],
      };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return {
        token: null,
        errors: [
          {
            message: `Invalid credentials`,
          },
        ],
      };
    }

    const token = JWT.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: 3600000,
    });

    return {
      token,
      errors: [],
    };
  },
};
