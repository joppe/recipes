import type { NextPage } from 'next';

import { Logout } from '../components/navigation/Logout';
import { Menu } from '../components/navigation/Menu';
import { Navigation } from '../components/navigation/Navigation';

const Home: NextPage = () => {
  return (
    <>
      <Navigation>
        <Logout />
        <Menu />
      </Navigation>
    </>
  );
};

export default Home;
