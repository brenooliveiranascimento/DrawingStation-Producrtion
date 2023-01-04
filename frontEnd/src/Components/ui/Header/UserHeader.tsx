import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Router from 'next/router';
import { handleScreen } from '../../../redux/actions/genericActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { FaHome, FaPencilAlt, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import logo from '../../../../public/logo1.png';
import { requestNotification } from '../../../redux/actions/notificationActions/requestNotification';
import UserContent from './UserContent';

export default function UserHeader() {
  const { userData } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();

  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
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
      <UserContent/>
    </header>
  );
}
