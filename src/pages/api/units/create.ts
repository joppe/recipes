import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { handle } from '../../../server/form/handle';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UnitModel } from '../../../server/type/unit/model';
import { validate } from '../../../server/type/unit/validate';
import { Unit } from '../../../types/unit.type';

async function createUnit(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input: Unit = await handle(req);
        const validateResult = await validate(input);

        if (!validateResult.isValid) {
            return res.json({
                success: false,
                error: validateResult.error,
            });
        }

        const unit = new UnitModel(input);

        await unit.save();

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
