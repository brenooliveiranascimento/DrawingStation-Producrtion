import { parseCookies } from 'nookies';
import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../../services/api.connection';
import { getStripeJs } from '../../../../services/stripe-js';
import styles from './styles.module.scss';
import logo from '../../../../../public/Logoteste3.png';

export default function Subscription() {
  const cookies = parseCookies();

  const { id, stripeClientId, premium } = useSelector(({ user }: globalState) => user.userData);

  const signaturesPlans = {
    mensal: '/subscription/mensal',
    anual: 'subscription/anual'
  };

  const initCheckout = async (subscription: string) => {
    try {
      if(premium) return;
      const token = cookies['DRAWING_USER_DATA'];
      const { data } = await apiConnection.post(subscription,
        { userId: id }, { headers: { 'Authorization': token } });
      const { sessionId } = data;
      const stripe = await getStripeJs();
      console.log(sessionId);
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

  return (
    <section className={styles.subscription_continer}>
      <section>
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
      <section>
        <article>
          <h1>367,00/Ano 15% de desconto</h1>
          <span>Assinatura Anual!</span>
        </article>
        <button
          disabled={premium}
          style={{
            backgroundColor: premium ? 'green' : 'white',
          }}
          onClick={() => !premium && initCheckout(signaturesPlans.anual)}>
          { premium ? 'Premium ativo!!!' : 'Assianr plano anual' }
        </button>
      </section>
      <section>
        <article>
          <h1>Portal do assinante</h1>
          <span>Atualize/Cancele seus planos</span>
        </article>
        <button disabled={!premium} onClick={accessPortal}>
          Acessar portal do assinante
        </button>
      </section>
    </section>
  );
}
