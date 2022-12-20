import React, { useState } from 'react';
import { Input } from '../../Components/ui/Inputs/Inputs';
import mainStyles from './styles.module.scss';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  return (
    <section className={mainStyles.home_container}>
      <label htmlFor='email' className={mainStyles.label_content}>
        Digite seu email para enviarmos o código de validação
        <Input
          placeholder='digite seu email'
          name='email'
          onChange={({target}) => setEmail(target.value)}
          value={email}
        />
      </label>
      <button>
        Enviar
      </button>
    </section>
  );
}
