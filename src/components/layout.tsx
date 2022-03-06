import { GeistProvider, CssBaseline } from '@geist-ui/react';

export default function Layout({ children }: any) {
  return (
    <>
      <p>Header here</p>
      {children}
      <p>footer here</p>
    </>
  );
}
