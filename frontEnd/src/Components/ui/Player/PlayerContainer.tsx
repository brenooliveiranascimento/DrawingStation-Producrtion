import React, { useEffect, useState } from 'react';
import Player from './player';
import PlayerSideBar from './PlayerSideBar/PlayerSideBar';
import styles from './styles.module.scss';

export default function PlayerContainer() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect((): any => {
    const verifyWidth = setInterval(() => setWidth(window.innerWidth), 100);
    return () => clearInterval(verifyWidth);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(width);
  }, [width]);

  return (
    <section className={styles.main_player_container}>
      <section className={styles.player_with_side_bar}>
        <Player/>
        {
          width >= 1590 ? <PlayerSideBar/> : (
            <section
              style={{
                display: !showSideBar ? 'none' : 'flex'
              }}
              className={styles.absolute_side_bar}
            >
              <PlayerSideBar/>
            </section>
          )
        }
      </section>
    </section>
  );
}
