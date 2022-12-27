import React, { useEffect, useState } from 'react';
import Player from './player';
import PlayerSideBar from './PlayerSideBar/PlayerSideBar';
import styles from './styles.module.scss';

export default function PlayerContainer() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  // const handleSideExerciceArea = () => {
  //   if (window.innerWidth <= 1530) return setShowSideBar(!showSideBar);
  // };

  useEffect((): any => {
    const verifyWidth = setInterval(() => setWidth(window.innerWidth), 100);
    return () => clearInterval(verifyWidth);
  }, [width]);

  return (
    <section className={styles.main_player_container}>
      <section className={styles.player_with_side_bar}>
        <Player/>
        {
          width >= 1590 ? <PlayerSideBar/> : (
            <section
              style={{
                position: 'absolute',
                width: '100%',
                height: '100vh',
                top: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '13rem',
                paddingTop: '10rem'
              }}
            >
              { showSideBar && (
                <section style={{
                  display: 'flex',
                }}>
                  <PlayerSideBar/>
                </section>
              )}
            </section>
          )
        }
      </section>
    </section>
  );
}
