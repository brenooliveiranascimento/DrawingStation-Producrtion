import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { UserInterface } from '../interfaces/UserInterfaces';
import { apiConnection } from './api.connection';
import { getStripeJs } from './stripe-js';

const cookies = parseCookies();

export const initCheckout = async (subscription: string, userData: UserInterface) => {
  const { id, premium } = userData;
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

export const accessPortal = async (userData: UserInterface) => {
  const { id, stripeClientId } = userData;

  if(!stripeClientId) return;
  try {
    if(!stripeClientId) return;
    const token = cookies['DRAWING_USER_DATA'];
    const { data } = await apiConnection.post(`/subscription/portal/${id}`,
      null, { headers: { 'Authorization': token } });
    window.location.href = data.portalUrl;
  } catch(e: any) {
    toast.error('Erro ao acessr o portal do asinante, por favor tente mais tarde ou entre em contato');
    console.log(e.message);
  }
};