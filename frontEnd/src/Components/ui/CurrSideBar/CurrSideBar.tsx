import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle, FiPenTool} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { handleScreen } from '../../../redux/actions/genericActions';
import Router, { useRouter } from 'next/router';
import { FaPencilAlt } from 'react-icons/fa';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { apiConnection } from '../../../services/api.connection';
import { parseCookies } from 'nookies';
import profileDefault from '../../../../public/profilePhoto.png';

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

  const currPath = router.pathname;

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
    <nav className={styles.side_bar_container}>
      <section className={styles.nac_area}>
        <button onClick={() => changeScreen('/')}>
          <FiHome size={28} color={currPath === '/HomePage' || !currScreen ? '#5c5c5c' : 'white'}/>
        </button>
        <button
          onClick={() => changeScreen('Classroom')}>
          <FaPencilAlt size={28} color={currPath === '/Classroom' ? '#5c5c5c' : 'white'}/>
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
