import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import ClassroomsPage from '../../Components/ui/HomePage/Classrooms';
import UserHeader from '../../Components/ui/HomePage/Header/UserHeader';
import ModulesScreen from '../../Components/ui/HomePage/ModulesScreen/ModulesScreen';
import Subscription from '../../Components/ui/HomePage/Subscription';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { requestClassroomAction } from '../../redux/actions/classroomActions/classroomActions';
import { requestModulesAction } from '../../redux/actions/moduleActions/moduleActions';
import { requestSubModulesAction } from '../../redux/actions/subModuleActions/subModuleActions';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

interface DashboardPropTypes {
  userData: UserInterface,
}
function HomePage({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();

  const { user, modules } = useSelector((state: globalState) => state);
  const { currScreen } = user;

  const initHome = async () => {
    await dispatch(AutenticationSuccess(userData));
    await dispatch(requestModulesAction());
    await dispatch(requestSubModulesAction());
    await dispatch(requestClassroomAction());
  };

  const ScreenController = () => {
    if(currScreen === 'Modules') return <ModulesScreen />;
    if(currScreen === 'Classrooms') return <ClassroomsPage />;
    if(currScreen === 'Subscription') return <Subscription />;
    return <ModulesScreen />;
  };

  useEffect(() => {
    initHome();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
        <UserHeader/>
        <ScreenController />
      </section>
    </section>
  );
}

export default HomePage;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const userConncetion = serverSideSetupUser(ctx);

  const { data } = await userConncetion.post('/auth/me');
  const { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId },
    }
  };

});
