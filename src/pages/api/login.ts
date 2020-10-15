import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../config/mongoose';
import { forceRequestMethod } from '../../server/middleware/force-request-method';
import { UserModel } from '../../server/type/user/model';
import { JSONWebTokenClaims } from '../../types/user.type';

interface LoginRequest extends NextApiRequest {
    body: {
        email: string;
        password: string;
    };
}

async function loginUser(
    req: LoginRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const result = await UserModel.findOne({ email: req.body.email });

        if (result === null) {
            return res.json({ success: false, msg: 'Incorrect credentials' });
        }

        const isValid = await compare(req.body.password, result.password);

        if (isValid) {
            const claims: JSONWebTokenClaims = {
                sub: result._id,
                name: result.name,
                email: result.email,
            };
            const jwt = sign(claims, <string>process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/',
                }),
            );

            res.json({
                success: true,
                user: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    role: result.role,
                },
            });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        res.status(401).json({ success: false, msg: err.message });
    }
}

export default forceRequestMethod('POST', loginUser);
