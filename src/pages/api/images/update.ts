import { NextApiRequest, NextApiResponse } from 'next';

import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { imageService } from '../../../server/type/image/service';
import { Image } from '../../../types/image.type';

async function updateImage(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const input: Image = await handle(req);
        const result = await imageService.update(input);

        if (typeof result === 'object') {
            return res.json({
                success: false,
                error: result,
            });
        }

        if (result) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                msg: 'Image not found',
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authenticated('user', forceRequestMethod('PUT', updateImage));
