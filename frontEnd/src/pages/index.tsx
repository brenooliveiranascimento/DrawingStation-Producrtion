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
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoad(false), 2000);
    setTimeout(() => setDrop(true), 2100);
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
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height:'100vh',
              backgroundColor:drop ?  'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.0)',
              backdropFilter: drop ? 'blur(20px)' : 'blur(0px)',
              transition: 'all 0.6s'
            }}
          />
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
