import { connect } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { options, url } from '../../../config/mongoose';
import { authenticated } from '../../../server/middleware/authenticated';
import { forceRequestMethod } from '../../../server/middleware/force-request-method';
import { UnitModel } from '../../../server/type/unit/model';
import { validate } from '../../../server/type/unit/validate';

interface CreateUnitRequest extends NextApiRequest {
    body: {
        name: string;
        abbreviation: string;
    };
}

async function createUnit(
    req: CreateUnitRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        await connect(url, options);

        const input = {
            name: req.body.name,
            abbreviation: req.body.abbreviation,
        };
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

export default authenticated('user', forceRequestMethod('POST', createUnit));
