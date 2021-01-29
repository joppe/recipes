import { NextApiRequest, NextApiResponse } from 'next';

import { unitService } from '../../../server/entity/unit/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function readUnit(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await unitService.getById(req.query.id as string);

        res.json({ success: true, unit: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readUnit));
