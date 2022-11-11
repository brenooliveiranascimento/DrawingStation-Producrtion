import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Input } from '../Components/ui/Inputs/Inputs';
import { Button } from '../Components/ui/buttons/Buttons';

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
          <Button
            type='submit'
            loading={false}
          >
            Entrar
          </Button>
        </form>
      </section>
    </section>
  );
};

export default Home;
