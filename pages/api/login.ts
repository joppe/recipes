import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../config/mongoose';
import { forceRequestMethod } from '../../server/middleware/force-request-method';
import { UserModel } from '../../server/types/user/model';

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
            return res
                .status(401)
                .json({ msg: 'Unable to login with user/pwd' });
        }

        const isValid = await compare(req.body.password, result.password);

        if (isValid) {
            const claims = {
                sub: result._id,
                name: result.name,
                email: result.email,
            };
            const jwt = sign(claims, <string>process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ authToken: jwt });
        } else {
            res.status(401).json({ msg: 'Unable to login with user/pwd' });
        }
    } catch (err) {
        res.status(401).json({ msg: err.message });
    }
}

export default forceRequestMethod('POST', loginUser);
