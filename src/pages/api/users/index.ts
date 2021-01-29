import { NextApiRequest, NextApiResponse } from 'next';

import { userService } from '../../../server/entity/user/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function readUser(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await userService.getAll({ email: 'asc' });

        res.json({ success: true, users: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('admin', forceRequestMethod('GET', readUser));
