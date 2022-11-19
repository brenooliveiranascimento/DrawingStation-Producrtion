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
      <iframe
        id="panda-901eedef-87a6-4042-a571-429e3a32e6cd"
        src="https://player-vz-0a98901c-edb.tv.pandavideo.com.br/embed/?v=901eedef-87a6-4042-a571-429e3a32e6cd" 
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        width="720" height="360">
      </iframe>
    </section>
  );
}

export default HomePage;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  
  return {
    props: {}
  };
});
