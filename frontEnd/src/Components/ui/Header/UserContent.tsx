import Image from 'next/image';
import React from 'react';
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
export default function UserContent() {
  const { userData } = useSelector((state: globalState) => state.user);
  const { classroomController: { module }, modules: { modules } } = useSelector((state: globalState) => state);
  const { name, premium, profilePhoto, stripeClientId } = userData;
  const dispatch = useDispatch();
  const router = useRouter();
  const changeScreen = (screen: string) => {
    router.push(screen);
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
  );
}
