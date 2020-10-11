import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { exists } from '../../../server/types/user/exists';
import { UserModel } from '../../../server/types/user/model';
import { validate } from '../../../server/types/user/validate';
import { Role } from '../../../types/user.type';

interface CreateUserRequest extends NextApiRequest {
    body: {
        name: string;
        email: string;
        password: string;
        role: string;
    };
}

async function createUser(
    req: CreateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: <Role>req.body.role,
        };
        const validateResult = validate(input);

        if (!validateResult.isValid) {
            return res.json({
                msg: 'Data not valid',
                error: validateResult.error,
            });
        }

        const userExists = await exists(input.email);

        if (userExists) {
            return res.json({ msg: 'E-mail must be unique' });
        }

        const password = await hash(input.password, 12);
        const user = new UserModel({
            name: input.name,
            email: input.email,
            password: password,
            role: input.role,
        });

        await user.save();

        res.json({ msg: 'User successfully created' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated(forceRequestMethod('POST', createUser));
