import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';
import profileDefault from '../../../../../public/profilePhoto.png';

export default function UserHeader() {
  const { userData } = useSelector((state: globalState) => state.user);
  const { name, premium, profilePhoto, stripeClientId } = userData;
  return (
    <header className={styles.header_container}>
      <aside>
        <h1>a</h1>
      </aside>
      <aside>
        <section className={styles.premium_area}>
          <h2>{name}</h2>
          <button>
            <span>{ stripeClientId ? 'Renovar Assinatura' : 'Obter Premium' }</span>
          </button>
        </section>
        <button>
          <Image width={50} alt={name} height={50} style={{
            borderRadius: '50%' , border: premium ? '4px solid #B8860B' : 'null'
          }} src={profilePhoto || profileDefault}/>
          { premium && <span>Premium!</span> }
        </button>
      </aside>
    </header>
  );
}
