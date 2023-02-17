import { ApolloProvider } from '@apollo/client';
import cookie from 'cookie';
import App, { AppContext, AppProps } from 'next/app';

import { AutContextProvider } from '../components/auth/AuthProvider';
import { CookieProvider } from '../components/cookie/CookieProvider';
import { Login } from '../components/login/Login';
import { useApollo } from '../hooks/useApollo';
import '../styles/globals.css';

type MyAppProps = Pick<AppProps, 'Component' | 'pageProps'> & {
  cookies: Record<string, string>;
};

function MyApp({ cookies, Component, pageProps }: MyAppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <CookieProvider cookies={cookies}>
      <ApolloProvider client={apolloClient}>
        <AutContextProvider loginComponent={<Login />}>
          <Component {...pageProps} />
        </AutContextProvider>
      </ApolloProvider>
    </CookieProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const cookies = cookie.parse(context.ctx.req?.headers.cookie || '');

  return { ...ctx, cookies };
};

export default MyApp;
