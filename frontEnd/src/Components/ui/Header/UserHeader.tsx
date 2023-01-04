import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import profileDefault from '../../../../public/profilePhoto.png';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import { handleScreen } from '../../../redux/actions/genericActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { toast } from 'react-toastify';
import { FaBell, FaCrown, FaFonticons, FaHome, FaPencilAlt, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import logo from '../../../../public/logo1.png';
import { requestNotification } from '../../../redux/actions/notificationActions/requestNotification';
export default function UserHeader() {
  const { userData } = useSelector((state: globalState) => state.user);
  const { classroomController: { module }, modules: { modules } } = useSelector((state: globalState) => state);
  const { name, premium, profilePhoto, stripeClientId } = userData;
  const dispatch = useDispatch();

  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
  };

  const cookies = parseCookies();

  const accessPortal = async () => {
    if(!stripeClientId) return;
    try {
      if(!stripeClientId) return;
      const token = cookies['DRAWING_USER_DATA'];
      const { data } = await apiConnection.post(`/subscription/portal/${userData.id}`,
        null, { headers: { 'Authorization': token } });
      window.location.href = data.portalUrl;
    } catch(e: any) {
      toast.error('Erro ao acessr o portal do asinante, por favor tente mais tarde ou entre em contato');
      console.log(e.message);
    }
  };

  useEffect(() => {
    dispatch(requestNotification());
  }, [userData]);

  return (
    <header
      className={styles.header_container}>
      <aside className={styles.navigation_container}>
        <nav className={styles.navigation_screen}>
          <Link
            href={'/HomePage'}
          >
            <Image
              src={logo}
              width={200}
              height={100}
              alt={'DrawingStation logo'}
            />
          </Link>
        </nav>
        <section className={styles.search}>
          <input placeholder='Procurar Aula'/>
          <FaSearch className={styles.search_input} color='#aaa'/>
        </section>
        <section className={styles.nav_mobile}>
          <button onClick={() => changeScreen('HomePage')}>
            <FaHome className={styles.home_page}/>
          </button>
          <button onClick={() => changeScreen('Classroom')}>
            <FaPencilAlt className={styles.pencil}/>
          </button>
        </section>
      </aside>
      <aside  className={styles.user_container}>
        <section className={styles.user_crown}>
          { premium && <button onClick={() => changeScreen('Subscription')}>
            <FaCrown/>
          </button> }
          <button onClick={() => changeScreen('User')} className={styles.user_photo}>
            <Image width={50} alt={name} height={50} src={profilePhoto || profileDefault}/>
          </button>
        </section>
        <section className={styles.premium_area}>
          <h2>{name}</h2>
          { premium ? <button onClick={accessPortal}>
            <span>Gerenciar planos</span>
          </button> : <button onClick={() => changeScreen('Subscription')}>
            <span>{ stripeClientId ? 'Renovar Assinatura' : 'Obter Premium' }</span>
          </button> }
        </section>
        <section className={styles.notification_area}>
          <span>a</span>
          <button>
            <FaBell color='white' size={23}/>
          </button>
        </section>
      </aside>
    </header>
  );
}
