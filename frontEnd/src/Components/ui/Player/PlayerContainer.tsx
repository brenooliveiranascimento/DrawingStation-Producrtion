import React, { useEffect } from 'react';
import Player from './player';
import PlayerHeader from './PlaherHeader/PlayerHeader';
import PlayerSideBar from './PlayerSideBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

export default function PlayerContainer() {
  return (
    <section className={styles.main_player_container}>
      <PlayerHeader/>
      <section className={styles.player_with_side_bar}>
        <Player/>
        <PlayerSideBar/>
      </section>
    </section>
  );
}
