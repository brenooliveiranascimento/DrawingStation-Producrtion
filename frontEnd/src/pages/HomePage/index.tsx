import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import ClassroomsPage from '../../Components/ui/HomePage/Classrooms';
import ModulesScreen from '../../Components/ui/HomePage/ModulesScreen/ModulesScreen';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { requestModulesAction } from '../../redux/actions/moduleActions/moduleActions';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

interface DashboardPropTypes {
  userData: UserInterface,
}
function HomePage({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();

  const { currScreen } = useSelector((state: globalState) => state.user);

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
    dispatch(requestModulesAction());
  };

  const ScreenController = () => {
    if(currScreen === 'Modules') return <ModulesScreen />;
    if(currScreen === 'Classrooms') return <ClassroomsPage />;
    return <ModulesScreen />;
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
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
