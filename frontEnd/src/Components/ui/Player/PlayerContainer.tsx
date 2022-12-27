import React, { useEffect, useState } from 'react';
import Player from './player';
import PlayerSideBar from './PlayerSideBar/PlayerSideBar';
import styles from './styles.module.scss';

export default function PlayerContainer() {
  return (
    <section className={styles.main_player_container}>
      <section className={styles.player_with_side_bar}>
        <Player/>
        <PlayerSideBar/>
      </section>
    </section>
  );
}
