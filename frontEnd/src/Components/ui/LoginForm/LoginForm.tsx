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
import { FaGoogle, FaGooglePay, FaGooglePlay, FaInstagram, FaInstagramSquare, FaLink, FaLinkedin } from 'react-icons/fa';
import styles from '../../../../styles/Home.module.scss';
import { IUserCredentials } from '../../../interfaces/userCredentials';
import nookies from 'nookies';
import { globalTypes } from '../../../utils/globalTypes';
import Modal from 'react-modal';
import ValidationAccount from './ValidationAccount';
import { FcGoogle } from 'react-icons/fc';

export default function LoginForm() {
  const dispatch = useDispatch();
  
  const [register, setRegister] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [firstLoad, setFIstLoad] = useState(true);
  const [codeMode, setCodeMode] = useState(false);
  const [unknowField, setUnknowField] = useState('');

  const [credentials, setCredentials] = useState<IUserCredentials>({
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

  const sendToken = async () => {
    try {
      const { data } = await apiConnection.post('/auth/validateEmail/init',
        { email: credentials.email });

      nookies.set(null, globalTypes.DRAWING_VERIFICATION_TOKEN, data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });  
      toast.success(`Código de verificação enviado enviado para ${credentials.email}`);
      setCodeMode(true);
    } catch(e: any) {
      toast.error(e.message);
    }
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
        console.log(data);
        dispatch(loginWithGoogle(data, redirect, '/HomePage'));
      } catch(e: any) {
        toast.dismiss('Algo de errado! :(');
        console.log(e);
      }
    },
  });

  const sigin = () => {
    const { email, password } = credentials;
    dispatch(siginUser({ email, password }, redirect, '/HomePage'));
  };

  const userRegister = () => {
    dispatch(registerUser(credentials, redirect, '/HomePage'));
  };

  const handleAutentication = (e: FormEvent) => {
    e.preventDefault();
    if(register) return sendToken();
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
  const [screenWidth, setScreenWidth] = useState(0);

  const updateWidth = setInterval(() => setScreenWidth(Number(window.innerWidth)), 100);

  useEffect(() => {
    updateWidth;
    setInterval(() => console.log(window.innerWidth), 100);
    return () => clearInterval(updateWidth);
  }, []);

  return (
    <section
      style={{
        borderTopLeftRadius: screenWidth < 950 ? '1rem' : '0rem',
        borderBottomLeftRadius: screenWidth < 950 ? '1rem' : '0rem',
      }}
      className={styles.login}>
      <Modal
        isOpen={codeMode}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex:99,
            bottom: 0,
            backgroundColor: '#00000029'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: 'none',
            background: '#1d292dee',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            backdropFilter: 'blur(3px)',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Example Modal"
      >
        <ValidationAccount credentials={credentials} userRegister={userRegister} sendCode={sendToken}/>
      </Modal>
      <form onSubmit={handleAutentication}>
        {
          register && (
            <>
              <Input
                style={{borderColor: unknowField === 'name' ? 'red' : 'white'}}
                value={credentials.name}
                onChange={({target}) => handleUserCredentials(target)}
                name='name'
                placeholder='Name'
              />
              <Input
                style={{borderColor: unknowField === 'PhoneNumber' ? 'red' : 'white'}}
                value={credentials.phoneNumber}
                onChange={({target}) => handleUserCredentials(target)}
                name='phoneNumber'
                placeholder='PhoneNumber'
              />
            </>
          )
        }
        <Input
          style={{borderColor: unknowField === 'email' ? 'red' : 'white'}}
          value={credentials.email}
          onChange={({target}) => handleUserCredentials(target)}
          name='email'
          placeholder='Email'
        />
        <Input
          type={'password'}
          value={credentials.password}
          style={{borderColor: unknowField === 'password' ? 'red' : 'white'}}
          onChange={({target}) => handleUserCredentials(target)}
          name='password'
          placeholder='Password'
        />

        {register && (<Input
          value={credentials.confirmPassword}
          style={{borderColor: unknowField === 'confirmPassword' ? 'red' : 'white'}}
          onChange={({target}) => handleUserCredentials(target)}
          placeholder='Confirm password'
          name='confirmPassword'
          type='password'
        />)}
        <button
          className={styles.login_btn}
          type='submit'
          disabled={disabled}
          style={{
            color: disabled ? '#aaa' : '#fff',
            border: disabled ? '1px solid #aaa' : '1px solid #fff'
          }}
        >
          {register ? ( 'Registrar' ) : ( 'Entrar' )}
        </button>
        <button
          className={styles.login_btn}
          onClick={() => loginGoogle()} type='button' >
          Entrar com Google <FcGoogle size={30} style={{
            position: 'absolute', marginTop:'-0.2rem', marginLeft:'0.4rem'
          }}/>
        </button>
      </form>
      <a onClick={handleRegister} className={styles.handle_form}>
        { register ? ( 'Já possuo uma conta' ) : ( 'Não possui conta? Registrar-se' ) }
      </a>
      { !register && <a onClick={() => redirect('/ForgetPassword')} className={styles.handle_form}>
        Esqueci minha senha
      </a> }
      {
        !register && (
          <nav className={styles.nav_container}>
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.drawingstation"
              className={styles.app}
              rel="noreferrer"
            >
              <FaGooglePlay/> Baixe o app
            </a>
            <nav className={styles.nav_area}>
              <a
                target="_blank"
                href="https://www.instagram.com/drawingstation56/"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/drawingstation/"
                rel="noreferrer">
                <FaLinkedin/>
              </a>
            </nav>
          </nav>
        )
      }
    </section>
  );
}
