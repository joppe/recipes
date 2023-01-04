import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import { JWT_SECRET } from './secret';

export function loginHandler(prisma: PrismaClient) {
  return async (email: string, password: string): Promise<string | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      console.log(`There is no user with the email address "${email}"`);
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log(`Invalid credentials`);
      return null;
    }

    return JWT.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: 3600000,
    });
  };
}
