import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import { canSSRGuest } from '../utils/canSSrguest';
import LoginForm from '../Components/ui/LoginForm/LoginForm';
import pencilLoad from '../../public/lottie/BYW78r0Cna.json';

import LoginCarrousel from '../Components/ui/LoginCarroussel/LoginCarrousel';
import Lottie from 'react-lottie';

const Home: NextPage = () => {

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoad(false), 2000);
  }, []);
  const defaultOptionsLoading: any = {
    loop: false,
    autoplay: true,
    animationData: pencilLoad,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      speed: 2
    },
  };
  if(load) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <section className={styles.home_container}>
          <Lottie
            style={{ width: 300, height: 280, }}
            options={defaultOptionsLoading}></Lottie>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.home_container}>
        <aside className={styles.login}>
          <LoginCarrousel/>
          <section>
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
