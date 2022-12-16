import React, { useEffect } from 'react';
import { getStripeJs } from '../../services/stripe-js';
import { serverSideConnection, apiConnection } from '../../services/api.connection';
import { parseCookies } from 'nookies';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { serverSideSetupUser } from '../../services/setupUser';
import jwtDecode from 'jwt-decode';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';

interface DashboardPropTypes {
  userData: UserInterface,
}
export default function Subscription({ userData }: DashboardPropTypes) {

  const dispatch = useDispatch();
  const cookies = parseCookies();

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
  };

  useEffect(() => {
    setUser();
  }, []);

  const { id } = useSelector(({ user }: globalState) => user.userData);

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
      await stripe?.redirectToCheckout({ sessionId });
    } catch(e: any) {
      console.log(e.message);
    }
  };

  const removePremium = async () => {
    try {
      const token = cookies['DRAWING_USER_DATA'];
      const resposne = await apiConnection.post(`/users/removePremium/${id}`,
        { userId: id }, { headers: { 'Authorization': token } });
      const { sessionId } = resposne.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch(e: any) {
      console.log(e.message);
    }
  };

  const accessPortal = async () => {
    try {
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
      <button onClick={removePremium}>
        Remover premium
      </button>
      <button onClick={accessPortal}>
        Portal do assinande (Cancelar/Atualizar assinatura!);
      </button>
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
