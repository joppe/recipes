import { NextApiRequest, NextApiResponse } from 'next';

type Handler<
    T extends NextApiRequest = NextApiRequest,
    K extends NextApiResponse = NextApiResponse
> = (req: T, res: K) => Promise<void>;

// Method not allowed
const STATUS_CODE = 405;

export async function forceRequestMethod<
    T extends NextApiRequest = NextApiRequest,
    K extends NextApiResponse = NextApiResponse
>(req: T, res: K, method: string, fn: Handler): Promise<void> {
    if (req.method !== method) {
        return res
            .status(STATUS_CODE)
            .json({ msg: `Only accept ${method} calls` });
    }

    await fn(req, res);
}
