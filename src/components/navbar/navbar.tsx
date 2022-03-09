import { useUser } from '@auth0/nextjs-auth0';
import { Header, Anchor, Box, Text, Avatar, Spinner } from 'grommet';
import { useMinecraftUser } from '../../swr/index';

const Username = () => {
  const { minecraftUser, isLoading, isError } = useMinecraftUser();

  if (isError) {
    return (
      <Box direction="row" align="center" gap="medium">
        <Text>No MC Account Synced</Text>
        <Anchor href="/profile">Visit Profile</Anchor>
      </Box>
    );
  }

  if (minecraftUser) {
    const uuid = minecraftUser?.minecraft?.uuid;

    // todo replace with username (from web request to MC api?)
    return <Anchor href="/profile">{uuid}</Anchor>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <Text>Something went wrong!</Text>;
};

const LoggedOut = () => {
  return <Anchor href="/api/auth/login">Login</Anchor>;
};

const Loading = () => {
  return <Spinner />;
};

const LoggedIn = () => {
  return (
    <Box gap="medium" direction="row" align="center">
      {/* Make this use actual players' uuid */}
      <Avatar
        size="xsmall"
        src="https://crafatar.com/avatars/e7b7aa17-8c93-4618-af85-e580fa98e202"
      />
      <Username />
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
