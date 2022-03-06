import { Text, Header, Menu, Anchor, Footer, Box } from 'grommet';
import HeadContainer from './boilerplate/head-container';
import BottomBar from './bottombar';
import NavBar from './navbar';

export default function Layout({ children, pageTitle }: any) {
  return (
    <>
      <HeadContainer {...pageTitle} />
      <Box fill>
        <NavBar />
        <Box flex="grow" pad={{ horizontal: `medium` }}>
          {children}
        </Box>
        <BottomBar />
      </Box>
    </>
  );
}
