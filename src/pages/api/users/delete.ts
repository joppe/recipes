import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UserModel } from '../../../server/type/user/model';

interface DeleteUserRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteUser(
    req: DeleteUserRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const query = { _id: req.body.id };
        const result = await UserModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ msg: 'User successfully deleted' });
        } else {
            res.status(500).json({ msg: 'User not deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default authenticated('admin', forceRequestMethod('DELETE', deleteUser));