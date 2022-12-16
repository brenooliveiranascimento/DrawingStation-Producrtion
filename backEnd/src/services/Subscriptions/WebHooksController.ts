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
  
    switch(event.type){
      case 'customer.subscription.deleted':
        const payment = event.data.object as Stripe.Subscription;

        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        )
      
        break;
      case 'customer.subscription.updated':
         const paymentIntent = event.data.object as Stripe.Subscription;

         await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false
         )

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