import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import profileDefault from '../../../../../public/profilePhoto.png';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import { handleScreen } from '../../../../redux/actions/genericActions';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../../services/api.connection';
import { toast } from 'react-toastify';
import { FaCrown, FaHome } from 'react-icons/fa';
import { ModulesInterface } from '../../../../interfaces/modules/ModulesInterface';
import { selectSubModuleAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import Link from 'next/link';
import logo from '../../../../../public/logo1.png';
export default function ClassHeader() {
  const { userData, currScreen } = useSelector((state: globalState) => state.user);
  const { classroomController: { module }, modules: { modules } } = useSelector((state: globalState) => state);
  const [showHeader, setShowHeader] = useState(true);
  const { name, premium, profilePhoto, stripeClientId } = userData;
  const dispatch = useDispatch();
  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
  };

  const changeModule = async (moduleInf: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInf));
    await setShowHeader(!showHeader);
    setShowHeader(true);
  };

  const cookies = parseCookies();

  useEffect(() => {
    console.log(modules);
  }, [modules]);

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
    <header
      style={{
        marginLeft:'0rem'
      }}
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
            {
              currScreen === 'Classroom' && (
                <FaHome size={30} color='#aaa'/>
              )}
          </Link>
        </nav>
        
        <nav>
          { showHeader && modules.map((currModule: ModulesInterface) => (
            <button
              onClick={() => changeModule(currModule)}
              className={styles.change_mdule_container} key={module.id}>
              <h1
                style={{
                  color: module.id === currModule.id ? '#28CB99' : '#aaa',
                  borderTop: module.id === currModule.id ? '3px solid #28CB99' : 'none',
                  paddingTop: module.id === currModule.id ? '1.4rem' : 'none',
                  marginTop: module.id === currModule.id ? '-1.6rem' : 'none'
                }}
              >
                {currModule.name}
              </h1>
            </button>
          ))}
        </nav>
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
