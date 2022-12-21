import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../services/api.connection';
import { getStripeJs } from '../../services/stripe-js';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { serverSideSetupUser } from '../../services/setupUser';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';
import UserHeader from '../../Components/ui/HomePage/Header/UserHeader';

interface ISubscriptionProps {
  userData: UserInterface,
}

export default function Subscription({ userData }: ISubscriptionProps) {
  const cookies = parseCookies();

  const { id, stripeClientId, premium } = useSelector(({ user }: globalState) => user.userData);

  const signaturesPlans = {
    mensal: '/subscription/mensal',
    anual: 'subscription/anual'
  };

  const plans = [
    { type: '/subscription/mensal', valor: '34,00/Mês', description: 'Assinatura mensal' },
    { type: '/subscription/anual', valor: '367,00/Ano 15% de desconto', description: 'Assinatura Anual!' },
    { type: null, valor: 'Portal do assinante', description: 'Atualize/Cancele seus planos' }
  ];

  const dispatch = useDispatch();

  const initCheckout = async (subscription: string) => {
    try {
      if(premium) return;
      const token = cookies['DRAWING_USER_DATA'];
      const { data } = await apiConnection.post(subscription,
        { userId: id }, { headers: { 'Authorization': token } });
      const { sessionId } = data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch(e: any) {
      console.log(e.message);
    }
  };

  const accessPortal = async () => {
    if(!stripeClientId) return;
    try {
      if(!stripeClientId) return;
      const token = cookies['DRAWING_USER_DATA'];
      const { data } = await apiConnection.post(`/subscription/portal/${id}`,
        null, { headers: { 'Authorization': token } });
      window.location.href = data.portalUrl;
    } catch(e: any) {
      console.log(e.message);
    }
  };

  const initScreen = () => {
    dispatch(AutenticationSuccess(userData));
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
            plans.map((currPlan: any, index: number) => {
              return (
                <section key={index}>
                  <article>
                    <h1>34,00/Mês</h1>
                    <span>Assinatura mensal</span>
                  </article>
                  <button 
                    disabled={premium}
                    style={{
                      backgroundColor: premium ? 'green' : 'white'
                    }}
                    onClick={() => !premium && initCheckout(signaturesPlans.mensal)}>
                    { premium ? 'Premium ativo!!!' : 'Assianr plano mensal' }
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
  const { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId },
    }
  };

});
