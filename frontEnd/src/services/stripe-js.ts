import { loadStripe } from '@stripe/stripe-js';

export const getStripeJs = async () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
  const stripe = await loadStripe(key);
  return stripe;
};
