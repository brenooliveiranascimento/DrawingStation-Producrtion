import React from 'react';
import styles from './styles.module.scss';

interface AdmHeaderProps {
  currPage: string
}

function AdmHeader({ currPage }: AdmHeaderProps) {
  return (
    <header className={styles.adm_header_container}>
      <h1>{currPage}</h1>
      <span>Welcome to {currPage}</span>
    </header>
  );
}

export default AdmHeader;
