import Image from 'next/image';
import React, { useState } from 'react';
import { FaBell, FaCrown } from 'react-icons/fa';
import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../../../public/logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import profileDefault from '../../../../public/profilePhoto.png';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { useRouter } from 'next/router';
import { handleScreen } from '../../../redux/actions/genericActions';
import { apiConnection } from '../../../services/api.connection';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import { INotification } from '../../../interfaces/modules/notificationInterfaces';
import { updateNotification } from '../../../redux/actions/notificationActions/updateNotificationAction';
export default function UserContent() {

  const {
    user: { userData: { name, premium, profilePhoto, stripeClientId, id }, oldAss },
    notificationsModule: { data, error, errorMessage }
  } = useSelector((state: globalState) => state);

  const [notifications, setNotifications] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = parseCookies();

  const changeScreen = (screen: string) => {
    router.push(screen);
    dispatch(handleScreen(screen));
  };

  const accessPortal = async () => {
    if(!stripeClientId) return;
    try {
      if(!stripeClientId) return;
      const token = cookies['DRAWING_USER_DATA'];
      const { data } = await apiConnection.post(`/subscription/portal/${id}`,
        null, { headers: { 'Authorization': token } });
      window.location.href = data.portalUrl;
    } catch(e: any) {
      toast.error('Erro ao acessr o portal do asinante, por favor tente mais tarde ou entre em contato');
      console.log(e.message);
    }
  };

  const getNewNotifications = () => {
    const newNotifications = data.filter((currNotification: INotification) => currNotification.active);
    return newNotifications;
  };

  return (
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
        <h2>{`${name.split(' ')[0]} ${name.split(' ')[1]}`}</h2> 
        { premium ? <button onClick={accessPortal}>
          <span>Gerenciar planos</span>
        </button> : <button onClick={() => changeScreen('Subscription')}>
          <span>{ oldAss ? 'Renovar Assinatura' : 'Obter Premium' }</span>
        </button> }
      </section>
      <section className={styles.notification_area}>
        { getNewNotifications().length > 0 && <span>{getNewNotifications().length}</span> }
        <button onClick={() => setNotifications(!notifications)}>
          <FaBell color={ getNewNotifications().length ? 'gold' : 'white'} size={23}/>
        </button>
      </section>
      <NotificationContainer close={() => setNotifications(false)} active={notifications} /> 
    </aside>
  );
}
