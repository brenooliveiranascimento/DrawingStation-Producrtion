/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.scss';
import Head from 'next/head';
import { Input } from '../../Components/ui/Inputs/Inputs';
import { Button } from '../../Components/ui/buttons/Buttons';
import Logo from '../../../public/logo1.png';
import Image from 'next/image';
import { creadentialSiginValidation } from '../../utils/credentialValidation';
import { useDispatch } from 'react-redux';
import { siginUser } from '../../redux/actions/autenticationActions/autenticationActions';
import Router from 'next/router';
import { canSSRGuest } from '../../utils/canSSrguest';

const Home: NextPage = () => {

  const dispatch = useDispatch();
  
  const [disabled, setDisabled] = useState(true);
  const [firstLoad, setFIstLoad] = useState(true);
  const [unknowField, setUnknowField] = useState('');

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  interface TargetValue {
    name: string;
    value: string
  }

  const handleUserCredentials = (target: TargetValue) => {
    const { name, value } = target;
    setCredentials({...credentials, [name]: value});
  };

  const checkUserCredentials = () => {
    if(firstLoad) return setFIstLoad(false);

    const { check, unknowCredential } = creadentialSiginValidation(credentials);
    if(!check) {
      setUnknowField(unknowCredential);
      return setDisabled(true);
    }
    setUnknowField('');
    setDisabled(false);
  };

  const redirect = (path: string) => Router.push(path);

  const sigin = () => {
    const { email, password } = credentials;
    dispatch(siginUser({ email, password }, redirect, '/dashboard'));
  };

  const handleAutentication = (e: FormEvent) => {
    e.preventDefault();
    sigin();
  };

  useEffect(() => {
    checkUserCredentials();
  }, [credentials]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.home_container}>
        <aside className={styles.login}>
          <Image
            width={350}
            alt='logo'
            src={Logo}
          />
          <form onSubmit={handleAutentication}>
            <Input
              style={{borderBottomColor: unknowField === 'email' ? 'red' : 'white'}}
              value={credentials.email}
              onChange={({target}) => handleUserCredentials(target)}
              name='email'
              placeholder='Email'
            />
            <Input
              type={'password'}
              value={credentials.password}
              style={{borderBottomColor: unknowField === 'password' ? 'red' : 'white'}}
              onChange={({target}) => handleUserCredentials(target)}
              name='password'
              placeholder='Password'
            />
            <Button
              type='submit'
              loading={false}
              disabled={disabled}
            >
              Entrar
            </Button>
          </form>
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

