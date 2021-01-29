import { NextApiRequest, NextApiResponse } from 'next';

import { userService } from '../../../server/entity/user/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

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
        const success = await userService.delete(req.body.id);

        if (success) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: 'User not found',
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('admin', forceRequestMethod('DELETE', deleteUser));
