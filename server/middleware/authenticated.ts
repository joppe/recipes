import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function authenticated(fn: NextApiHandler): NextApiHandler {
    return async function (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> {
        try {
            verify(
                <string>req.headers.authorization,
                <string>process.env.JWT_SECRET,
            );

            return await fn(req, res);
        } catch (err) {
            res.status(401).json({ msg: 'Invalid token' });
        }
    };
}
