import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';

function HomePage() {
  const { userData } = useSelector((state: globalState) => state.user);
  console.log(userData);
  return (
    <section>
      <h1>Seja bem vindo {userData.name}</h1>
    </section>
  );
}

export default HomePage;
