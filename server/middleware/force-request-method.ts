import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// Method not allowed
const STATUS_CODE = 405;

export function forceRequestMethod(
    method: string,
    fn: NextApiHandler,
): NextApiHandler {
    return async function (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> {
        if (req.method !== method) {
            return res
                .status(STATUS_CODE)
                .json({ msg: `Only accept ${method} calls` });
        }

        return await fn(req, res);
    };
}
