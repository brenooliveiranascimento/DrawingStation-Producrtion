import React, { useEffect } from 'react';
import { MdAccessibleForward, MdDashboardCustomize } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

interface DashboardPropTypes {
  userData: UserInterface,
}
function HomePage({ userData }: DashboardPropTypes) {
  const { userData: user } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <section className={styles.home_page_container}>
      <h1>Seja bem vindo {userData.name}</h1>
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
