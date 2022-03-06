import { Heading, Box, Main, Text } from 'grommet';

export default function Index() {
  return (
    <Box align="center">
      <Main align="center">
        <Heading>Just Ricky</Heading>
        <Text>Staff Panel</Text>
      </Main>
    </Box>
  );
}

Index.getInitialProps = async () => {
  return { pageTitle: `Home` };
};
