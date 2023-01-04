import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';
import defaultUserPhoto from '../../../../public/profilePhoto.png';
import { useRouter } from 'next/router';
import nookies, { destroyCookie } from 'nookies';
import { globalTypes } from '../../../utils/globalTypes';

export default function UserCard() {
  const router = useRouter();

  const { userData } = useSelector(({user}: globalState) => user);
  const { profilePhoto, name } = userData;
  

  const logout = () => {
    nookies.destroy(null, globalTypes.DRAWING_USER_DATA);
    router.push('/');
    localStorage.clear();
  };
  
  return (
    <section className={styles.card_container}>
      <section>
        <Image
          alt={`${name} profile photo`}
          width={50}
          height={50}
          style={{
            borderRadius: '50%'
          }}
          src={profilePhoto || defaultUserPhoto}
        />
        <h1>{name}</h1>
        <button onClick={logout}>sair</button>
      </section>
    </section>
  );
}
