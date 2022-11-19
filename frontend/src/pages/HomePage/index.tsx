import React from 'react';
import { MdAccessibleForward, MdDashboardCustomize } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

function HomePage() {
  const { userData } = useSelector((state: globalState) => state.user);
  return (
    <section className={styles.home_page_container}>
      <h1>Seja bem vindo {userData.name}</h1>
    </section>
  );
}

export default HomePage;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  
  return {
    props: {}
  };
});
