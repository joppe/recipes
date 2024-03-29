import cookie from 'cookie';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens/
 */

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Get the `auth-token` cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const authToken = cookies['auth'];

    // Add authorization key
    req.headers.authorization = process.env.GRAPHQL_SERVER_KEY;

    // Don't forward cookies to the API
    req.headers.cookie = '';

    // Set auth-token header from cookie
    if (authToken) {
      req.headers['auth-token'] = authToken;
    }

    proxy.once('error', reject);

    proxy.web(req, res, {
      target: 'http://localhost:4000/graphql',
      autoRewrite: false,
      selfHandleResponse: false,
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
