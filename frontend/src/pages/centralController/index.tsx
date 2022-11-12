/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { setupUser } from '../../services/setupUser';
import { canSSRAdm } from '../../utils/canSSRAdm';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import apiConnection from '../../services/api.connection';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { useDispatch } from 'react-redux';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import Head from 'next/head';
import styles from './styles.module.scss';

interface DashboardPropTypes {
  userData: UserInterface,
}

function CentralController({userData}: DashboardPropTypes) {
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
        <title>Central-Controller</title>
      </Head>
      <section className={styles.central_controller_container}>
        <h1>Central Controller!!</h1>
      </section>
    </>
  );
}

export default CentralController;

export const getServerSideProps = canSSRAdm(async (ctx) => {
  const userConncetion = setupUser(ctx);
  const cookies = parseCookies(ctx);  

  const token = cookies['DRAWING_USER_DATA'];
  const decodedEmail: any = jwtDecode(token);

  const { data: validateEmail } = await apiConnection.post('/auth/adm', {
    'email': decodedEmail.email
  }, {
    headers: {
      'Authorization': token
    }
  });

  if(validateEmail.error) {
    return {
      redirect:{
        destination: '/dashboard',
        permanent: false,
      }
    };
  }

  const {data} = await userConncetion.post('/auth/me');
  const { id, name, email, profilePhoto, birthday, phoneNumber } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber }
    }
  };

});
