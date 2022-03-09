import { useUser } from '@auth0/nextjs-auth0';
import { Header, Anchor, Box, Text, Avatar, Spinner } from 'grommet';
import { useMinecraftMeta } from '../../swr/index';

const Loading = () => {
  return <Spinner />;
};

const Username = () => {
  const { minecraftMeta, isLoading } = useMinecraftMeta();

  if (minecraftMeta) {
    const name = minecraftMeta?.data?.player?.username;

    // todo replace with username (from web request to MC api?)
    return <Anchor href="/profile">{name}</Anchor>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box direction="row" align="center" gap="medium">
      <Text>No MC Account Synced</Text>
      <Anchor href="/profile">Visit Profile</Anchor>
    </Box>
  );
};

const MinecraftAvatar = () => {
  const { minecraftMeta, isLoading } = useMinecraftMeta();

  if (minecraftMeta) {
    const avatar = minecraftMeta?.data?.player?.avatar;
    // todo replace with username (from web request to MC api?)
    return <Avatar size="xsmall" src={avatar} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <></>;
};

const LoggedOut = () => {
  return <Anchor href="/api/auth/login">Login</Anchor>;
};

const LoggedIn = () => {
  return (
    <Box gap="medium" direction="row" align="center">
      <MinecraftAvatar />
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
