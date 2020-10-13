import { verify } from 'jsonwebtoken';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../config/mongoose';
import { forceRequestMethod } from '../../server/middleware/force-request-method';
import { UserModel } from '../../server/types/user/model';
import { JSONWebToken } from '../../types/user.type';

async function whoAmI(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.headers.cookie === undefined) {
        return res.send({ user: null });
    }

    try {
        const token = <JSONWebToken>(
            verify(req.cookies.auth, <string>process.env.JWT_SECRET)
        );

        await connect(url, options);

        const user = await UserModel.findOne({ _id: token.sub });

        if (user === null) {
            res.send({ user: null });
        }

        res.send({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.send({ user: null });
    }
}

export default forceRequestMethod('GET', whoAmI);
