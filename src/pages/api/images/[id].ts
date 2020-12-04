import { NextApiRequest, NextApiResponse } from 'next';

import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { imageService } from '../../../server/type/image/service';

async function readImage(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const image = await imageService.getById(<string>req.query.id);

        res.json({ success: true, image });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export default authenticated('user', forceRequestMethod('GET', readImage));
