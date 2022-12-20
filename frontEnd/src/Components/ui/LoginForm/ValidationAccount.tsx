import React from 'react';
import { IUserCredentials } from '../../../interfaces/userCredentials';
import { Input } from '../Inputs/Inputs';

interface ICredentials {
  credenciasls: IUserCredentials
}

export default function ValidationAccount({credentials}: ICredentials) {
  return (
    <section>
      <Input/>
    </section>
  );
}
