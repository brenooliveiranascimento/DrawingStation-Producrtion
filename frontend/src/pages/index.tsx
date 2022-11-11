import React, { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import { Input } from '../Components/ui/Inputs/Inputs';
import { Button } from '../Components/ui/buttons/Buttons';
import Logo from '../../public/logo1.png';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';

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
            <Button>
              Entrar com Google <FaGoogle style={{
                position: 'absolute', marginTop:'0.1rem', marginLeft:'0.4rem'
              }}/>
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
