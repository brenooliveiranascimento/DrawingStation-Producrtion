import Stripe from 'stripe';

const apiKey = process.env.STRIPE_API_KEY as string;

export const stripe = new Stripe(
  apiKey,
  {
    apiVersion: '2022-08-01',
    appInfo:{
      name: 'DrawingStation',
      version: '1'
    }
  }
)