import React, { useEffect } from 'react';
import { MdAccessibleForward, MdDashboardCustomize } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { ModulesInterface } from '../../interfaces/modules/ModulesInterface';
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
  const { modules } = useSelector((state: globalState) => state);
  const dispatch = useDispatch();

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
    dispatch(requestModulesAction());
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <section className={styles.home_page_container}>
      <section className={styles.home_container}>
        { modules.modules.map((currModule: ModulesInterface) => (
          <span key={currModule.id}>{currModule.name}</span>
        )) }
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
