import Head from 'next/head';

export type HeadContainerProps = {
  pageTitle: string;
};

export default function HeadContainer(props: HeadContainerProps) {
  return (
    <Head>
      <title>JRPanel {props.pageTitle ? `| ${props.pageTitle}` : null}</title>
      <meta
        name="description"
        content="TypeScript starter for Next.js that includes all you need to build amazing apps"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
