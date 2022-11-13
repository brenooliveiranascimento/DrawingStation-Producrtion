import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupUser } from '../../services/setupUser';
import { useDispatch } from 'react-redux';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { UserInterface } from '../../interfaces/UserInterfaces';
import Navbar from '../../Components/ui/SideBar/Navbar';
import ModulesController from '../../Components/AdmComponents/ModuleController/ModulesController';
import AdmHeader from '../../Components/AdmComponents/AdmHeader/AdmHeader';

interface DashboardPropTypes {
  userData: UserInterface,
}

function Dashboad({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();
  const [currScreen, setCurrScreen] = useState('dashboard');

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
  };

  useEffect(() => {
    setUser();
  }, []);

  const handleScreen = (screen: string) => {
    setCurrScreen(screen);
  };

  const Main = () => {
    switch(currScreen) {
    case 'Users':
      return (<h1>Users</h1>);
    case 'Dashboard':
      return <ModulesController/>;
    default:
      return <ModulesController />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <section className={styles.dashboard_container}>
        <Navbar setCurrScreen={(screen: string) => handleScreen(screen)} currScreen={currScreen} />
        <section className={styles.main_container}>
          <AdmHeader currPage={currScreen}/>
          <Main />
        </section>
      </section>
    </>
  );
}

export default Dashboad;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const userConncetion = setupUser(ctx);

  const {data} = await userConncetion.post('/auth/me');
  const { id, name, email, profilePhoto, birthday, phoneNumber } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber }
    }
  };
});
