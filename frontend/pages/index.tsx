import { Button } from '@recipes/ui/component/form';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div>
      <h1>This is the homepage</h1>
      <div className="bg-blue-600 text-gray-50">Hello</div>
      <div className="bg-red-600 text-gray-50">World</div>
      <Button>?</Button>
    </div>
  );
};

export default Home;
