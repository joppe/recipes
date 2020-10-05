import { NextApiRequest, NextApiResponse } from 'next';

type Handler<
    T extends NextApiRequest = NextApiRequest,
    K extends NextApiResponse = NextApiResponse
> = (req: T, res: K) => Promise<void>;

export async function forceRequestMethod<
    T extends NextApiRequest = NextApiRequest,
    K extends NextApiResponse = NextApiResponse
>(req: T, res: K, method: string, fn: Handler): Promise<void> {
    if (req.method !== method) {
        return res.status(500).json({ msg: `Only accept ${method} calls` });
    }

    await fn(req, res);
}
