import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { Role } from '../../types/user.type';

export function authenticated(role: Role, fn: NextApiHandler): NextApiHandler {
    return async function (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> {
        try {
            verify(req.cookies.auth, <string>process.env.JWT_SECRET);

            return await fn(req, res);
        } catch (err) {
            res.status(401).json({ msg: 'Invalid token' });
        }
    };
}
