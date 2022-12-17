import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { UserInterface } from '../../../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../../../redux/actions/autenticationActions/autenticationGenericActions';
import { apiConnection } from '../../../../services/api.connection';
import { serverSideSetupUser } from '../../../../services/setupUser';
import { getStripeJs } from '../../../../services/stripe-js';
import { canSSRAuth } from '../../../../utils/canSSRAuth';

export default function Subscription() {
  const cookies = parseCookies();

  const { id, stripeClientId } = useSelector(({ user }: globalState) => user.userData);

  const signaturesPlans = {
    mensal: '/subscription/mensal',
    anual: 'subscription/anual'
  };

  const initCheckout = async (subscription: string) => {
    try {
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
    <section>
      <button onClick={() => initCheckout(signaturesPlans.mensal)}>
        Assianr plano mensal
      </button>
      <button onClick={() => initCheckout(signaturesPlans.anual)}>
        Assianr plano anual
      </button>
      <button onClick={accessPortal}>
        Portal do assinande (Cancelar/Atualizar assinatura!);
      </button>
    </section>
  );
}
