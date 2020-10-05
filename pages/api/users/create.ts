import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UserModel } from '../../../server/types/user/model';

interface CreateUserRequest extends NextApiRequest {
    body: {
        name: string;
        email: string;
        password: string;
    };
}

async function createUser(
    req: CreateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        /**
         * TODO check if email already exists
         */

        const password = await hash(req.body.password, 12);
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: password,
        });

        await user.save();

        res.json({ msg: 'User successfully created' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default async function (
    req: CreateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    await forceRequestMethod(req, res, 'POST', createUser);
}
