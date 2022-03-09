import { AppProps } from 'next/app';
import '@/styles/global.css';
import Layout from '@/components/layout';
import 'normalize.css/normalize.css';
import { Grommet } from 'grommet';
import { theme } from '@/components/theme';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SWRConfig } from 'swr';
import { localStorageProvider } from '@/swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 5 * 60 * 1000, // refresh every 5 minutes (5 min * 60 sec/min * 1000 milli/sec)
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        provider: () => localStorageProvider(),
      }}
    >
      <UserProvider>
        <Grommet theme={theme} full>
          <Layout pageTitle={pageProps.pageTitle}>
            <Component {...pageProps} />
          </Layout>
        </Grommet>
      </UserProvider>
    </SWRConfig>
  );
}
