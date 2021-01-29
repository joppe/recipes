import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { UserModel } from '../../../server/entity/user/model';
import { validate } from '../../../server/entity/user/validate';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { alreadyExists } from '../../../server/validator/already-exists';
import { Role } from '../../../types/user.type';

interface UpdateUserRequest extends NextApiRequest {
    body: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
    };
}

async function updateUser(
    req: UpdateUserRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input = {
            _id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: <Role>req.body.role,
        };
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                msg: 'Data not valid',
                error: validateResult.error,
            });
        }

        const userExists = await alreadyExists(
            UserModel,
            'email',
            input.email,
            input._id,
        );

        if (userExists) {
            return res.json({ msg: 'E-mail must be unique' });
        }

        const filter = { _id: input._id };
        const password = await hash(input.password, 12);
        const doc = {
            name: input.name,
            email: input.email,
            password,
            role: input.role,
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

export default authenticated('admin', forceRequestMethod('PUT', updateUser));
