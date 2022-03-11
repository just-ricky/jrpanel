import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Button, DropButton, Heading, Spinner, Tag, Text } from 'grommet';
import { useEffect, useState } from 'react';
import { useMinecraftMeta } from '../../swr/index';
import { MinecraftMeta } from '../../types/minecraftmeta/index';
import { SyncStartResponse, UnsyncResponse } from '../../types/sync/index';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';

const Loading = () => {
  return <Spinner />;
};

type SyncEnabledProps = {
  minecraftUsername: string;
};

const SyncEnabled = (props: SyncEnabledProps) => {
  const router = useRouter();

  return (
    <Box direction="column" align="start" gap="small">
      <Tag name="MC Sync" value={`enabled`} />
      <Text weight={`bold`}>Synchronized with</Text>
      <Text color={`dark-4`}>{props.minecraftUsername}</Text>
      <Button
        onClick={async () => {
          // call unsync api
          // todo make this more streamlined and look better
          try {
            const response: UnsyncResponse = (
              await axios.get(`/api/profile/sync/unsync`)
            ).data;
            if (response.error) {
              // todo fancy modal thing
              alert(`Error: ` + response.message);
            } else {
              // refresh
              router.reload();
            }
          } catch (e) {
            console.error(e);
          }
        }}
        label="Unsync your account"
      />
    </Box>
  );
};

const SyncDisabled = () => {
  const [code, setCode] = useState(``);
  // call and cache sync start for later use
  // todo make the 'start' api find an existing sync session and return that code based on the auth0id
  const { data, error } = useSWR(`/api/profile/sync/start`);

  useEffect(() => {
    if (!data || error) {
      setCode(``);
      return;
    }
    const syncStartResponse: SyncStartResponse = data as SyncStartResponse;

    if (!syncStartResponse.code) {
      setCode(``);
      return;
    }

    setCode(syncStartResponse.code);
  }, [data, error]);

  return (
    <Box direction="column" align="start" gap="small">
      <Tag name="MC Sync" value={`disabled`} />
      <DropButton
        label="Click to sync your account"
        dropAlign={{ top: `bottom`, right: `right` }}
        dropContent={
          <Box pad="small">
            <Text weight={`bolder`}>Enter this code in-game</Text>
            {!data && !error ? (
              <Loading />
            ) : (
              <Text color={`brand`}>{code}</Text>
            )}
          </Box>
        }
      />
    </Box>
  );
};

const Profile = () => {
  const { minecraftMeta, isError, isLoading } = useMinecraftMeta();
  const [meta, setMeta] = useState<MinecraftMeta | null>();

  useEffect(() => {
    if (minecraftMeta && !isError && !isLoading) {
      setMeta(minecraftMeta);
    } else {
      setMeta(null);
    }
  }, [minecraftMeta, isError, isLoading]);

  return (
    <Box flex background={`light-3`} pad={`medium`} overflow={`auto`}>
      <Box
        flex={false}
        responsive={true}
        direction="row-responsive"
        gap={`large`}
      >
        <Box gap={`large`}>
          <Box
            background={`white`}
            round={`medium`}
            pad={`medium`}
            gap={`medium`}
            direction="column"
            justify="around"
          >
            <Heading margin={`none`}>Profile</Heading>
            <Box direction="row" align="center">
              {meta ? (
                <SyncEnabled minecraftUsername={meta.data.player.username} />
              ) : (
                <SyncDisabled />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return { props: { pageTitle: `Profile` } };
  },
});
