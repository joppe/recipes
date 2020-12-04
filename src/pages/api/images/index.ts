import { NextApiRequest, NextApiResponse } from 'next';

import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { imageService } from '../../../server/type/image/service';

async function listImages(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const images = await imageService.getAll({ name: 'asc' });

        res.json(images);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export default forceRequestMethod('GET', listImages);
