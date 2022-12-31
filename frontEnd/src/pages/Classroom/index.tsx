import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { requestClassroomAction } from '../../redux/actions/classroomActions/classroomActions';
import { requestSubModulesAction } from '../../redux/actions/subModuleActions/subModuleActions';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import UserHeader from '../../Components/ui/Header/UserHeader';
import PlayerContainer from '../../Components/ui/Player/PlayerContainer';
import PlayerInf from '../../Components/ui/Player/PlayerInf/PlayerInf';
import { requestModulesAction } from '../../redux/actions/moduleActions/moduleActions';
import ClassHeader from '../../Components/ui/Player/ClassHeader/UserHeader';
import Comments from '../../Components/ui/Comments/Comments';

interface classroomPropTypes {
  userData: UserInterface,
}
export default function ClassroomsPage({ userData }: classroomPropTypes) {
  const dispatch = useDispatch();

  const initData = async () => {
    await dispatch(AutenticationSuccess(userData));
    await dispatch(requestSubModulesAction());
    await dispatch(requestClassroomAction());
    await dispatch(requestModulesAction());
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <section className={styles.main_container}>
        <ClassHeader/>
        <section className={styles.player_content}>
          <PlayerContainer/>
          <PlayerInf/>
        </section>
      </section>
    </section>
  );
}

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
