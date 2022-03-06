import { Footer, Text } from 'grommet';

export default function BottomBar() {
  return (
    <Footer background="brand" pad="small">
      <Text>JustRicky © {new Date().getFullYear()}</Text>
    </Footer>
  );
}
