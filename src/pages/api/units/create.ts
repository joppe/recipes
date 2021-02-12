import { NextApiRequest, NextApiResponse } from 'next';

import { unitService } from '../../../server/entity/unit/service';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { Unit } from '../../../types/unit.type';

async function createUnit(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Unit = await handle(req);
        const result = await unitService.create(input);

        if (typeof result === 'object') {
            return res.json({
                success: false,
                error: result,
            });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authenticated('user', forceRequestMethod('POST', createUnit));
