import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { serverSideSetupUser } from '../../services/setupUser';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import { ISubscription } from '../../interfaces/ISubscription';
import { plans } from '../../utils/subscriptionsData';
import UserHeader from '../../Components/ui/Header/UserHeader';
import { accessPortal, initCheckout } from '../../services/Subscription';
import { genericCommentAciton } from '../../redux/actions/commentsActions/genericAtions';

interface ISubscriptionProps {
  userData: UserInterface,
  oldAss: any
}

export default function Subscription({ userData, oldAss }: ISubscriptionProps) {
  const { premium } = useSelector(({ user }: globalState) => user.userData);

  const dispatch = useDispatch();

  const initChecckout = (type: string | null) => {
    if(!type) return accessPortal(userData);
    initCheckout(type, userData);
  };

  const initScreen = () => {
    dispatch(AutenticationSuccess(userData));
    dispatch(genericCommentAciton('OLD_ASS', oldAss || false));
  };

  useEffect(() => {
    initScreen();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
        <UserHeader/>
        <main className={styles.main}>
          {
            plans.map((currPlan: ISubscription, index: number) => {
              return (
                <section key={index}>
                  <article>
                    <h1>{currPlan.value}</h1>
                    <span>{currPlan.description}</span>
                  </article>
                  <button 
                    disabled={!currPlan.type && userData.premium ? !premium : premium}
                    style={{
                      backgroundColor: !currPlan.type ? 'white' : (premium ? 'green' : 'white')
                    }}
                    onClick={() => initChecckout(currPlan.type)}>
                    { !currPlan.type ? 'Acessar Portal do assinante' : premium ? 'Premium ativo!!!' : currPlan.btnMessage }
                  </button>
                </section>
              );
            })
          }
        </main>
      </section>
    </section>
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
