import { destroyCookie, parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IUserCredentials } from '../../../interfaces/userCredentials';
import { apiConnection } from '../../../services/api.connection';
import { globalTypes } from '../../../utils/globalTypes';
import { Input } from '../Inputs/Inputs';
import styles from './styles.module.scss';

interface ICredentials {
  credentials: IUserCredentials,
  sendCode: () => void,
  userRegister: () => void
}

export default function ValidationAccount({credentials, userRegister, sendCode}: ICredentials) {
  const [code, setCode] = useState('');
  const [sendTime, setSendTime] = useState(true);

  const resendCode = () => {
    setSendTime(true);
    sendCode();
  };

  const register = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies[globalTypes.DRAWING_VERIFICATION_TOKEN];
      const { data } = await apiConnection.post('/auth/validateEmail',
        { code: Number(code) },
        {headers: { 'Authorization': token }});
      destroyCookie(null, globalTypes.DRAWING_VERIFICATION_TOKEN);
      userRegister();
    } catch(e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const resendTime = () => {
    setTimeout(() => {
      setSendTime(false);
    }, 30000);
  };

  useEffect(() => {
    resendTime();
  }, []);

  return (
    <section className={styles.modal_caontainer}>
      <section className={styles.modal_limit}>
        <h2>Digite seu código</h2>
        <Input
          placeholder='Código de validação'
          value={code}
          onChange={({target}) => setCode(target.value)}
        />

        <button onClick={register}>
          Confirma
        </button>

        <button
          onClick={resendCode}
          disabled={sendTime}
        >
          Reenviar código
        </button>
      </section>
    </section>
  );
}
