import { useUser } from '@auth0/nextjs-auth0';
import { Header, Anchor, Box, Text, Avatar } from 'grommet';

const LoggedOut = () => {
  return <Anchor href="/api/auth/login">Login</Anchor>;
};

const Loading = () => {
  return <Text>Loading</Text>;
};

const LoggedIn = () => {
  return (
    <Box gap="medium" direction="row" align="center">
      {/* Make this use actual players' uuid */}
      <Avatar
        size="xsmall"
        src="https://crafatar.com/avatars/e7b7aa17-8c93-4618-af85-e580fa98e202"
      />
      <Anchor href="/profile">myUsername</Anchor>
      <Anchor href="/api/auth/logout">Logout</Anchor>
    </Box>
  );
};

export default function NavBar() {
  const { user, isLoading } = useUser();

  return (
    <Header pad={{ left: `medium` }}>
      <Box direction={`row`} gap={`medium`}>
        <Anchor href="/">Home</Anchor>
        <Anchor href="/panel">Panel</Anchor>
      </Box>
      <Box pad={{ right: `medium`, vertical: `small` }}>
        {isLoading ? <Loading /> : !user ? <LoggedOut /> : <LoggedIn />}
      </Box>
    </Header>
  );
}
