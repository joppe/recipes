import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { env } from '@/env';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPlannerPath = nextUrl.pathname.indexOf('/planner') !== -1;

      if (isPlannerPath) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/planner/meals', nextUrl));
      }
      return true;
    },
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
