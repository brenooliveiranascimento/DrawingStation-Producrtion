import Image from 'next/image';
import React from 'react';
import { userData } from '../../../interfaces/modules/commentsModuleInterfaces';
import defaultUser from '../../../../public/profilePhoto.png';

interface ICommentCardHeader {
  userData: userData
}

export default function CommentCardHeader({userData}: ICommentCardHeader) {
  return (
    <header>
      <section>
        <Image
          src={userData.profilePhoto ? userData.profilePhoto : defaultUser}
          height={50}
          style={{ borderRadius: '50%' }}
          width={50}
          alt={userData.name}
        />
        <span>{userData.name}</span>
      </section>
    </header>
  );
}
