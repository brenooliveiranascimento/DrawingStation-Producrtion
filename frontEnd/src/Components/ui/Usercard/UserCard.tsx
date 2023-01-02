import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';

export default function UserCard() {

  const { userData } = useSelector(({user}: globalState) => user);

  return (
    <section>

    </section>
  );
}
