import React from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import { Input } from '../Components/ui/Inputs/Inputs';
import { Button } from '../Components/ui/buttons/Buttons';
import BackgroundSide from '../../public/blueRose.jpg';
import Logo from '../../public/logo1.png';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.home_container}>
        <aside className={styles.login}>
          <Image
            width={350}
            alt='lgo'
            src={Logo}
          />
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
          <a className={styles.handle_form}>
            Não possui conta? <strong>Registrar se</strong>
          </a>
        </aside>
      </section>
    </>
  );
};

export default Home;
