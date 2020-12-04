import { NextApiRequest, NextApiResponse } from 'next';

import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { imageService } from '../../../server/type/image/service';

interface DeleteImageRequest extends NextApiRequest {
    body: {
        id: string;
    };
}

async function deleteImage(
    req: DeleteImageRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const success = await imageService.delete(req.body.id);

        if (success) {
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

export default authenticated('user', forceRequestMethod('DELETE', deleteImage));
