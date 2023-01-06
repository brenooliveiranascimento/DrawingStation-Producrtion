import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import UserHeader from '../../Components/ui/Header/UserHeader';
import ModulesScreen from '../../Components/ui/ModulesScreen/ModulesScreen';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { requestClassroomAction } from '../../redux/actions/classroomActions/classroomActions';
import { requestModulesAction } from '../../redux/actions/moduleActions/moduleActions';
import { requestSubModulesAction } from '../../redux/actions/subModuleActions/subModuleActions';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import {Adsense} from '@ctrl/react-adsense';
import HorizontalBanner from '../../Components/Ads/HorizontalBanner/HorizontalBanner';

interface DashboardPropTypes {
  userData: UserInterface,
}

function HomePage({ userData }: DashboardPropTypes) {
  const dispatch = useDispatch();

  const initHome = async () => {
    await dispatch(AutenticationSuccess(userData));
    await dispatch(requestSubModulesAction());
    await dispatch(requestClassroomAction());
    await dispatch(requestModulesAction());
  };

  useEffect(() => {
    initHome();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
        <UserHeader/>
        { !userData.premium && <HorizontalBanner/> }
        <ModulesScreen />
        {/* <Adsense
          client="ca-pub-2309409107490271"
          slot="7596712003"
          style={{ width: 500, height: 300, marginTop: '6rem' }}
          format="auto"
        /> */}
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
