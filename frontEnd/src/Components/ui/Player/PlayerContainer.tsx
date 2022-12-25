import React, { useEffect, useState } from 'react';
import Player from './player';
import PlayerHeader from './PlaherHeader/PlayerHeader';
import PlayerSideBar from './PlayerSideBar/PlayerSideBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Comments from '../Comments/Comments';

export default function PlayerContainer() {
  const [showComments, setShowComments] = useState(false);
  return (
    <section className={styles.main_player_container}>
      {/* <PlayerHeader/> */}
      <section className={styles.player_with_side_bar}>
        <Player/>
        <PlayerSideBar/>
      </section>
      <button onClick={() => setShowComments(!showComments)}>
        Mostrar comentários
      </button>
      { showComments && <Comments/> }
    </section>
  );
}
