import { AppProps } from 'next/app';
import '@/styles/global.css';
import Layout from '@/components/layout';
import 'normalize.css/normalize.css';
import { Grommet } from 'grommet';
import { theme } from '@/components/theme';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Grommet theme={theme} full>
        <Layout pageTitle={pageProps.pageTitle}>
          <Component {...pageProps} />
        </Layout>
      </Grommet>
    </UserProvider>
  );
}
