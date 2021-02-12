import { NextApiRequest, NextApiResponse } from 'next';

import { unitService } from '../../../server/entity/unit/service';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';

interface DeleteUnitRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteUnit(
    req: DeleteUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const success = await unitService.delete(req.body.id);

        if (success) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: 'Unit not found',
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('DELETE', deleteUnit));
