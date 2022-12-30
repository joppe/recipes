import JWT from 'jsonwebtoken';

import { UserInfo } from '../server/UserInfo';
import { JWT_SECRET } from './secret';

export function getUserInfoFromToken(
  token: string | undefined,
): UserInfo | null {
  if (token === undefined) {
    return null;
  }

  try {
    return JWT.verify(token, JWT_SECRET) as UserInfo;
  } catch (error) {
    return null;
  }
}
