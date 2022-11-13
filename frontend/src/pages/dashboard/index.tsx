import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupUser } from '../../services/setupUser';
import { useDispatch, useSelector } from 'react-redux';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { UserInterface } from '../../interfaces/UserInterfaces';
import Navbar from '../../Components/ui/SideBar/Navbar';

interface DashboardPropTypes {
  userData: UserInterface,
}

function Dashboad({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();
  const [currScreen, setCurrScreen] = useState('users');

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
    case 'users':
      return (<h1>Users</h1>);
    default:
      return (<h1>Dashboard</h1>);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <section className={styles.dashboard_container}>
        <Navbar setCurrScreen={(screen: string) => handleScreen(screen)} currScreen={currScreen} />
        <section>
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
