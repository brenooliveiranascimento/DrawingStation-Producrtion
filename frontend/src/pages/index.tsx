import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Input } from '../Components/ui/Inputs/Inputs';

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Login</title>
      </Head>
      <section>
        <form>
          <Input placeholder='Email'/>
          <Input placeholder='Password'/>
        </form>
      </section>
    </section>
  );
};

export default Home;
