const protocol =
    <string>process.env.NEXT_PUBLIC_VERCEL === '1' ? 'https' : 'http';

export const BASE_URL = `${protocol}://${<string>(
    process.env.NEXT_PUBLIC_API_URL
)}`;
