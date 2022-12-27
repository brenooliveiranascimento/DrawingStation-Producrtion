import Image from 'next/image';
import React from 'react';
import { userData } from '../../../interfaces/modules/commentsModuleInterfaces';
import defaultUser from '../../../../public/profilePhoto.png';
import styles from './styles.module.scss';

interface ICommentCardHeader {
  userData: userData
}

export default function CommentCardHeader({userData}: ICommentCardHeader) {
  return (
    <header className={styles.header_container}>
      <section>
        <Image
          src={userData.profilePhoto ? userData.profilePhoto : defaultUser}
          height={50}
          style={{ borderRadius: '50%' }}
          width={50}
          alt={userData.name}
        />
        <span className={styles.userName}>{userData.name}</span>
      </section>
    </header>
  );
}
