import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

export default class WebHooksController {
  async handle(req: Request, res: Response) {
    let event: Stripe.Event = req.body;
    let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if(endpointSecret) {
      const signature = req.headers['stripe-signature'] as string
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        )
      } catch(e: any) {
        console.log(e.messge);
      }
    }

    switch(event.type) {
      case 'customer.subscription.deleted':
        break;

      case 'customer.subscription.updated':
        break;
      
      case 'checkout.session.completed':
        break

      default:
    }

  }
}