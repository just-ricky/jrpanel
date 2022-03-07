import { Box } from 'grommet';
import HeadContainer from './boilerplate/head-container';
import BottomBar from './bottombar';
import NavBar from './navbar';

export default function Layout({ children, pageTitle }: any) {
  return (
    <>
      <HeadContainer pageTitle={pageTitle} />
      <Box fill>
        <NavBar />
        {children}
        <BottomBar />
      </Box>
    </>
  );
}
