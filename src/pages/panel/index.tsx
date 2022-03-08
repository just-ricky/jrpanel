import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Anchor, Box, Heading, Meter, Text } from 'grommet';
import { Tools } from 'grommet-icons';

export default function Panel() {
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
            direction="row"
          >
            <Box align="start" justify="between" gap={`medium`}>
              <Box direction="row" gap={`large`}>
                <Box>
                  <Heading level={3} margin="none">
                    All Reports
                  </Heading>
                  <Heading margin="none">194</Heading>
                  <Text>Unresolved</Text>
                </Box>
                <Box>
                  <Heading level={4} margin="none">
                    Your Reports
                  </Heading>
                  <Heading level={2} margin="none">
                    12
                  </Heading>
                  <Text>Resolved</Text>
                </Box>
              </Box>
              <Box>
                <Anchor>Manage</Anchor>
              </Box>
            </Box>
            <Box>
              <Meter
                values={[
                  {
                    value: 80,
                    color: `status-warning`,
                    label: `sixty`,
                  },
                ]}
                size="small"
                type="circle"
                aria-label="meter"
              />
            </Box>
          </Box>
        </Box>
        <Box gap={`large`}>
          <Box
            background={`white`}
            round={`medium`}
            pad={`medium`}
            gap={`medium`}
            align="center"
            justify="around"
            direction="row"
          >
            <Box gap={`medium`}>
              <Box>
                <Heading level={3} margin="none">
                  Punishments
                </Heading>
                <Heading margin="none">26</Heading>
                <Text>Your punishments</Text>
              </Box>
              <Box>
                <Anchor>Manage</Anchor>
              </Box>
            </Box>
            <Box>
              <Tools size={`xlarge`} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return { props: { pageTitle: `Panel` } };
  },
});
