import { NextApiRequest, NextApiResponse } from 'next';

import { unitService } from '../../../server/entity/unit/service';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

async function listUnits(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const result = await unitService.getAll({ name: 'asc' });

        res.json({ success: true, units: result });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default forceRequestMethod('GET', listUnits);
