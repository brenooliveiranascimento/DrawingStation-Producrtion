import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import profileDefault from '../../../../public/profilePhoto.png';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import { handleScreen } from '../../../redux/actions/genericActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { toast } from 'react-toastify';
import { FaCrown } from 'react-icons/fa';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';

export default function UserHeader() {
  const { userData } = useSelector((state: globalState) => state.user);
  const { classroomsData, modules: { modules } } = useSelector((state: globalState) => state);

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

  return (
    <header className={styles.header_container}>
      <aside className={styles.navigation_container}>
        { modules.map((module: ModulesInterface) => (
          <button key={module.id}>
            <h1>{module.name}</h1>
          </button>
        ))}
      </aside>
      <aside  className={styles.user_container}>
        <button className={styles.user_photo}>
          { premium && <button onClick={() => changeScreen('Subscription')}>
            <FaCrown/>
          </button> }
          <Image width={50} alt={name} height={50} src={profilePhoto || profileDefault}/>
        </button>
        <section className={styles.premium_area}>
          <h2>{name}</h2>
          { premium ? <button onClick={accessPortal}>
            <span>Gerenciar planos</span>
          </button> : <button onClick={() => changeScreen('Subscription')}>
            <span>{ stripeClientId ? 'Renovar Assinatura' : 'Obter Premium' }</span>
          </button> }
        </section>
      </aside>
    </header>
  );
}
