export const protocol =
    <string>process.env.NEXT_PUBLIC_VERCEL === '1' ? 'https' : 'http';
