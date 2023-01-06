import React from 'react';
import {Adsense} from '@ctrl/react-adsense';
import styles from './styles.module.scss';

export default function HorizontalBanner() {
  return (
    <section
      className={styles.horizontal_banner_container}
    >
      <Adsense
        client="ca-pub-2309409107490271"
        slot="7596712003"
        format="auto" />
      <h1>Anuncio</h1>
    </section>
  );
}
