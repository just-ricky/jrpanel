import { AppProps } from 'next/app';
import '@/styles/global.css';
import Layout from '@/components/layout';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GeistProvider>
  );
}
