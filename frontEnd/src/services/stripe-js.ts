import { loadStripe } from '@stripe/stripe-js';

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;

export const getStripeJs = async () => {
  const stripe = await loadStripe(key);
  return stripe;
};
