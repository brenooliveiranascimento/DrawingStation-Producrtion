import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle, FiPenTool} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { handleScreen } from '../../../redux/actions/genericActions';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { apiConnection } from '../../../services/api.connection';
import { parseCookies } from 'nookies';
import logo from '../../../../public/logo1.png';

export default function CurrSideBar() {
  const { currScreen } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();
  const { userData } = useSelector((state: globalState) => state.user);
  const { name, premium, profilePhoto, stripeClientId } = userData;

  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
  };
  
  const router = useRouter();

  const [currPath, setCurrPath] = useState('');

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
    dispatch(handleScreen(window.location.href.toString().split('/')[3]));
  }, []);

  return (
    <nav className={styles.side_bar_container}>
      <nav>
        <Image
          src={logo}
          width={200}
          height={100}
          alt={'DrawingStation logo'}
        />
      </nav>
      <section className={styles.nav_area}>
        <button onClick={() => changeScreen('/')}>
          <span
            style={{
              color: currScreen === 'HomePage' || !currScreen ? '#28CB99' : 'white',
              borderLeft: currScreen === 'HomePage' ? '3px solid #28CB99' : '1px solid white'
            }}
          >Home</span>
        </button>
        <button
          onClick={() => changeScreen('Subscription')}>
          <span
            style={{
              color: currScreen === 'Subscription' || !currScreen ? '#28CB99' : 'white',
              borderLeft: currScreen === 'Subscription' ? '3px solid #28CB99' : '1px solid white'
            }}
          >
            Planos
          </span>
        </button>
      </section>
      <aside>
        <section className={styles.premium_area}>
          <h2>{name}</h2>
          { premium ? <button onClick={accessPortal}>
            <span>Gerenciar planos</span>
          </button> : <button onClick={() => changeScreen('Subscription')}>
            <span>{ stripeClientId ? 'Renovar Assinatura' : 'Obter Premium' }</span>
          </button> }
        </section>
      </aside>
    </nav>
  );
}
