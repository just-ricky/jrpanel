import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Heading } from 'grommet';

const Profile = () => {
  return (
    <Box flex background={`light-3`} pad={`medium`} overflow={`auto`}>
      <Heading margin="none">Profile</Heading>
    </Box>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return { props: { pageTitle: `Profile` } };
  },
});
