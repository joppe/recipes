import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UserModel } from '../../../server/types/user/model';

interface CreateUserRequest extends NextApiRequest {
    body: {
        id: string;
        name: string;
        email: string;
        password: string;
    };
}

async function updateUser(
    req: CreateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        /**
         * TODO check if email already exists
         */

        const filter = { _id: req.body.id };
        const password = await hash(req.body.password, 12);
        const doc = {
            name: req.body.name,
            email: req.body.email,
            password,
        };
        const result = await UserModel.updateOne(filter, doc);

        if (result.nModified === 1) {
            res.json({ msg: 'User successfully updated' });
        } else {
            res.status(500).json({ msg: 'User not updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default async function (
    req: CreateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    await forceRequestMethod(req, res, 'PUT', updateUser);
}
