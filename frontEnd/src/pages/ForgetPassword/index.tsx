import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '../../Components/ui/Inputs/Inputs';
import { apiConnection } from '../../services/api.connection';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import mainStyles from './styles.module.scss';
import { globalTypes } from '../../utils/globalTypes';
import Router, { useRouter } from 'next/router';
import styles from './styles.module.scss';
export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [verify, setVerify] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resendTime, setResendTime] = useState(true);
  const [showPassword, setShowPassword] = useState('password');
  const [error, setError] = useState(false);
  const [code, setCode] = useState('');

  const updateResend = () => {
    setTimeout(() => {
      setResendTime(false);
    }, 30000);
  };

  const router = useRouter();

  const redirect = () => {
    router.push('/');
  };

  const initRecover = async () => {
    try {
      const { data } =await apiConnection.post('/auth/recoverPassword',
        { email });
      nookies.set(null, globalTypes.DRAWING_RECOVER_TOKEN, data.token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      toast.success('Token enviado');
      setResendTime(true);
      setVerify(true);
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };

  const validatePasswords = () => {
    if(newPassword !== confirmNewPassword) {
      toast.error('senhas não condizem');
      setError(true);
      return; 
    }
    validateRecover();
    setError(false);
  };

  const validateRecover = async () => {
    const cookies = parseCookies();
    const token = cookies[globalTypes.DRAWING_RECOVER_TOKEN];
    try {
      const { data } =await apiConnection.post('/auth/recoverPasswordFinish',
        { newPassword, code: Number(code) },
        { headers: { 'Authorization': token }});
      destroyCookie(null, globalTypes.DRAWING_RECOVER_TOKEN);
      toast.success(data.message);
      Router.push('/');
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => updateResend(), []);

  return (
    <section className={mainStyles.home_container}>
      {verify ? (
        <section className={mainStyles.confirPassword_area}>
          <button onClick={redirect} className={mainStyles.recover_password_area_button_back}>
            voltar
          </button>
          <Input
            placeholder='Código'
            name='código'
            type={'text'}
            onChange={({target}) => setCode(target.value)}
            value={code}
          />          <Input
            style={{
              borderBottomColor: error ? 'red' : 'white'
            }}
            placeholder='nova senha'
            name='password'
            type={showPassword}
            onChange={({target}) => setNewPassword(target.value)}
            value={newPassword}
          />
          <Input
            style={{
              borderBottomColor: error ? 'red' : 'white'
            }}
            placeholder='confirmar senha'
            name='password'
            type={showPassword}
            onChange={({target}) => setConfirmNewPassword(target.value)}
            value={confirmNewPassword}
          />
          <button onClick={() => setShowPassword(
            showPassword === 'password' ? 'text' : 'password'
          )}>
            Mostrar
          </button>
          <button disabled={resendTime} onClick={initRecover}>Reenviar código</button>
          <button onClick={validatePasswords}>Atualizar senha</button>
        </section>
      ) : (
        <section className={styles.recover_password_area}>
          <button onClick={redirect} className={styles.recover_password_area_button_back}>
            voltar
          </button>
          <label htmlFor='email' className={mainStyles.label_content}>
            Digite seu email para enviarmos o código de recuperação
            <Input
              placeholder='digite seu email'
              name='email'
              onChange={({target}) => setEmail(target.value)}
              value={email}
            />
          </label>
          <button className={styles.send_btn} onClick={initRecover}>Enviar código</button>
        </section>
      )}
    </section>
  );
}
