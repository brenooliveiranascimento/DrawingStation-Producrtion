import { Request, Response } from 'express';
import Stripe from 'stripe';
import { saveSubscription } from '../../utils/manageSubscription';
import { stripe } from '../../utils/stripe';

export default class WebHooksController {
  async handle(request: Request, response: Response){
    const sig = request.headers['stripe-signature'] as string;
    let event = request.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // try {
    //   event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // } catch (err: any) {
    //   response.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }
  
    console.log(event.type)
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        break;
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as any;
      
        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
          )
  
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
}