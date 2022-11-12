import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import syles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupUser } from '../../services/setupUser';
import { useDispatch, useSelector } from 'react-redux';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { UserInterface } from '../../interfaces/UserInterfaces';

interface DashboardPropTypes {
  userData: UserInterface,
}

function Dashboad({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <section className={syles.dashboard_container}>
        <h1>Dashboard</h1>
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
