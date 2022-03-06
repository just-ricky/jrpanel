import { Header, Anchor, Menu } from 'grommet';

export default function NavBar() {
  return (
    <Header pad={{ left: `small` }}>
      <Anchor href="/">Home</Anchor>
      <Menu label="account" items={[{ label: `logout` }]} />
    </Header>
  );
}
