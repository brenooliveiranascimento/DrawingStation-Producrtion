import React from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import Logo from '../../public/logo1.png';
import Image from 'next/image';
import { canSSRGuest } from '../utils/canSSrguest';
import LoginForm from '../Components/ui/LoginForm/LoginForm';
const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.home_container}>
        <aside className={styles.login}>
          <aside>

          </aside>
          <section>
            <Image
              width={350}
              alt='logo'
              src={Logo}
            />
            <LoginForm />
          </section>
        </aside>
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  };
});
