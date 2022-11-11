/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import { Input } from '../Components/ui/Inputs/Inputs';
import { Button } from '../Components/ui/buttons/Buttons';
import Logo from '../../public/logo1.png';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { creadentialRegisterValidation, creadentialSiginValidation } from '../utils/credentialValidation';

const Home: NextPage = () => {
  
  const [register, setRegister] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [unknowField, setUnknowField] = useState('');

  const [credentials, setCredentials] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if(register) {
      const { check, unknowCredential } = creadentialRegisterValidation(credentials);
      console.log(check, unknowCredential);
      if(!check) {
        setUnknowField(unknowCredential);
        return setDisabled(true);
      }
      setDisabled(false);
      setUnknowField('');
      return;
    }

    const { check, unknowCredential } = creadentialSiginValidation(credentials);
    if(!check) {
      setUnknowField(unknowCredential);
      return setDisabled(true);
    }
    setUnknowField('');
    setDisabled(false);
  };

  const handleRegister = () => {
    setCredentials({
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setUnknowField('');
    setRegister(!register);
  };

  const sigin = (e: FormEvent) => {
    e.preventDefault();
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
          <form onSubmit={sigin}>
            {
              register && (
                <>
                  <Input
                    value={credentials.name}
                    onChange={({target}) => handleUserCredentials(target)}
                    name='name'
                    placeholder='Name'
                  />
                  <Input
                    value={credentials.phoneNumber}
                    onChange={({target}) => handleUserCredentials(target)}
                    name='phoneNumber'
                    placeholder='PhoneNumber'
                  />
                </>
              )
            }
            <Input
              value={credentials.email}
              onChange={({target}) => handleUserCredentials(target)}
              name='email'
              placeholder='Email'
            />
            <Input
              value={credentials.password}
              onChange={({target}) => handleUserCredentials(target)}
              name='password'
              placeholder='Password'
            />
            {register && (<Input
              value={credentials.confirmPassword}
              onChange={({target}) => handleUserCredentials(target)}
              placeholder='Confirm password'
              name='confirmPassword'
            />)}
            <Button
              type='submit'
              loading={false}
              disabled={disabled}
            >
            Entrar
            </Button>
            <Button
              type='button'
            >
              Entrar com Google <FaGoogle style={{
                position: 'absolute', marginTop:'0.1rem', marginLeft:'0.4rem'
              }}/>
            </Button>
          </form>
          <a onClick={handleRegister} className={styles.handle_form}>
            {
              register ? (
                'Já possuo uma conta'
              ) : (
                'Não possui conta? Registrar-se'
              )
            }
          </a>
        </aside>
      </section>
    </>
  );
};

export default Home;
