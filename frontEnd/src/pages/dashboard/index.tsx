import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { serverSideSetupUser, setupUser } from '../../services/setupUser';
import { useDispatch } from 'react-redux';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { UserInterface } from '../../interfaces/UserInterfaces';
import Navbar from '../../Components/ui/SideBar/Navbar';
import ModulesController from '../../Components/AdmComponents/ModuleControllers/ModulesController';
import AdmHeader from '../../Components/AdmComponents/AdmHeader/AdmHeader';
import { canSSRAdm } from '../../utils/canSSRAdm';
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';
import { apiConnection, serverSideConnection } from '../../services/api.connection';
import SubModuleController from '../../Components/AdmComponents/SubModuleController/SubModuleController';
import ClassroomController from '../../Components/AdmComponents/ClassroomController/ClassroomController';
import UserController from '../../Components/AdmComponents/UserController/UserController';
import { genericCommentAciton } from '../../redux/actions/commentsActions/genericAtions';

interface DashboardPropTypes {
  userData: UserInterface,
  oldAss: any
}

function Dashboad({ userData, oldAss }: DashboardPropTypes) {
  const dispatch = useDispatch();
  const [currScreen, setCurrScreen] = useState('Modules');

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
    dispatch(genericCommentAciton('OLD_ASS', oldAss || false));
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
      return <UserController />;
    case 'Dashboard':
      return <ModulesController/>;
    case 'SubModules':
      return <SubModuleController />;
    case 'Classrooms':
      return <ClassroomController />;
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


export const getServerSideProps = canSSRAdm(async (ctx) => {
  const userConncetion = serverSideSetupUser(ctx);
  const cookies = parseCookies(ctx);  

  const token = cookies['DRAWING_USER_DATA'];
  const decodedEmail: any = jwtDecode(token);
  const { data: validateEmail } = await serverSideConnection.post('/auth/adm',
    { 'email': decodedEmail.email },
    { headers: {'Authorization': token }});
  if(validateEmail.error) {
    return {
      redirect:{
        destination: '/dashboard',
        permanent: false,
      }
    };
  }

  const {data} = await userConncetion.post('/auth/me');
  const { id, name, oldAss , email, profilePhoto, birthday, phoneNumber, premium, stripeClientId } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId },
      oldAss: oldAss || null
    }
  };

});
