import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginWithGoogle, registerUser, siginUser } from '../../../redux/actions/autenticationActions/autenticationActions';
import { apiConnection } from '../../../services/api.connection';
import { Input } from '../Inputs/Inputs';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { creadentialRegisterValidation, creadentialSiginValidation } from '../../../utils/credentialValidation';
import { Button } from '../buttons/Buttons';
import { FaGoogle } from 'react-icons/fa';
import styles from '../../../../styles/Home.module.scss';

export default function LoginForm() {
  const dispatch = useDispatch();
  
  const [register, setRegister] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [firstLoad, setFIstLoad] = useState(true);
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
    if(firstLoad) return setFIstLoad(false);
    
    if(register) {
      const { check, unknowCredential } = creadentialRegisterValidation(credentials);
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

  const redirect = (path: string) => Router.push(path);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data: userData } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${response.access_token}`
          }
        });
        const { data } = await apiConnection.post('/auth/google', {
          email: userData.email,
          sub: userData.sub,
          picture: userData.picture,
          name: userData.name
        });
        dispatch(loginWithGoogle(data, redirect, '/HomePage'));
      } catch(e: any) {
        toast.dismiss('Algo de errado! :(');
        console.log(e);
      }
    },
  });

  const sendEmail = async () => {
    try {
      const { data } = await apiConnection.post('/email/accountValidation', {
        email: 'carangueijo564helicoptero@gmail.com'
      });
      toast.success(data.message);
    } catch(e: any) {
      toast.error(e.message);
    }
  };

  const sigin = () => {
    const { email, password } = credentials;
    dispatch(siginUser({ email, password }, redirect, '/HomePage'));
  };

  const userRegister = () => {
    dispatch(registerUser(credentials, redirect, '/HomePage'));
  };

  const handleAutentication = (e: FormEvent) => {
    e.preventDefault();
    if(register) return userRegister();
    sigin();
  };

  const handleRegister = () => {
    setCredentials({
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setFIstLoad(true);
    setUnknowField('');
    setRegister(!register);
  };

  useEffect(() => {
    checkUserCredentials();
  }, [credentials]);

  return (
    <section className={styles.login}>
      <form onSubmit={handleAutentication}>
        {
          register && (
            <>
              <Input
                style={{borderBottomColor: unknowField === 'name' ? 'red' : 'white'}}
                value={credentials.name}
                onChange={({target}) => handleUserCredentials(target)}
                name='name'
                placeholder='Name'
              />
              <Input
                style={{borderBottomColor: unknowField === 'PhoneNumber' ? 'red' : 'white'}}
                value={credentials.phoneNumber}
                onChange={({target}) => handleUserCredentials(target)}
                name='phoneNumber'
                placeholder='PhoneNumber'
              />
            </>
          )
        }
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

        {register && (<Input
          value={credentials.confirmPassword}
          style={{borderBottomColor: unknowField === 'confirmPassword' ? 'red' : 'white'}}
          onChange={({target}) => handleUserCredentials(target)}
          placeholder='Confirm password'
          name='confirmPassword'
        />)}
        <Button
          type='submit'
          loading={false}
          disabled={disabled}
        >
          {register ? ( 'Registrar' ) : ( 'Entrar' )}
        </Button>
        <Button onClick={() => loginGoogle()} type='button' >
          Entrar com Google <FaGoogle style={{
            position: 'absolute', marginTop:'0.1rem', marginLeft:'0.4rem'
          }}/>
        </Button>
      </form>
      <a onClick={handleRegister} className={styles.handle_form}>
        { register ? ( 'Já possuo uma conta' ) : ( 'Não possui conta? Registrar-se' ) }
      </a>
      <a onClick={sendEmail} className={styles.handle_form}>
        enviar email
      </a>
    </section>
  );
}
