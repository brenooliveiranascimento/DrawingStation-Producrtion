import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import defaultUserPhoto from '../../../public/profilePhoto.png';
import UserHeader from '../../Components/ui/Header/UserHeader';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { serverSideSetupUser } from '../../services/setupUser';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import UserCard from '../../Components/ui/Usercard/UserCard';
import { globalTypes } from '../../utils/globalTypes';
import Router from 'next/router';
import { genericCommentAciton } from '../../redux/actions/commentsActions/genericAtions';

interface DashboardPropTypes {
  userData: UserInterface,
  oldAss: any
}
export default function User({ userData, oldAss }: DashboardPropTypes) {
  // const { name, profilePhoto, premium, phoneNumber, email, birthday } = userData;
  const dispatch = useDispatch();

  const initData = async () => {
    await dispatch(AutenticationSuccess(userData));
    dispatch(genericCommentAciton('OLD_ASS', oldAss || false));
  };



  useEffect(() => {
    initData();
  }, []);

  return (
    <main className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
        <UserHeader/>
        <UserCard />
      </section>
    </main>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const userConncetion = serverSideSetupUser(ctx);

  const { data } = await userConncetion.post('/auth/me');
  const { id, name,oldAss , email, profilePhoto, birthday, phoneNumber, premium, stripeClientId } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId },
      oldAss: oldAss || null
    }
  };

});
