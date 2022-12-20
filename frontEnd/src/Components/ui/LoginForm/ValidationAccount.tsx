import React, { useEffect, useState } from 'react';
import { IUserCredentials } from '../../../interfaces/userCredentials';
import { Input } from '../Inputs/Inputs';
import styles from './styles.module.scss';

interface ICredentials {
  credentials: IUserCredentials
}

export default function ValidationAccount({credentials}: ICredentials) {
  const [code, setCode] = useState('');
  const [sendTime, setSendTime] = useState(true);

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

        <button
          disabled={sendTime}
        >
          Reenviar código
        </button>
      </section>
    </section>
  );
}
