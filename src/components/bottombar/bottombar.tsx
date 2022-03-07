import { Footer, Text, Box } from 'grommet';

export default function BottomBar() {
  return (
    <Box>
      <Footer background="brand" pad="small">
        <Text>JustRicky © {new Date().getFullYear()}</Text>
      </Footer>
    </Box>
  );
}
