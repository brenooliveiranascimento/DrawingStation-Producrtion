import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';
import profileDefault from '../../../../../public/profilePhoto.png';

export default function UserHeader() {
  const { userData } = useSelector((state: globalState) => state.user);
  const { name, premium, profilePhoto } = userData;
  return (
    <header className={styles.header_container}>
      <aside>
        <h1>a</h1>
      </aside>
      <aside>
        <span>{name}</span>
        <Image width={50} alt={name} height={50} style={{
          borderRadius: '50%' 
        }} src={profilePhoto || profileDefault}/>
      </aside>
    </header>
  );
}
