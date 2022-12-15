import Subscription from "../../database/models/Subscription";
import UserModel from '../../database/models/UserModel';
import Stripe from 'stripe';
import { stripe } from "../../utils/stripe";
import 'dotenv';

interface IExecuteSubs {
  userId: number;
}

export default class SubscriptionService {

  async execute({ userId }: IExecuteSubs) {
    const user = await UserModel.findByPk(
      userId, { attributes: { exclude: ['password'] } });

      let customerId = user?.stripeClientId;
      
    if(!user?.stripeClientId) {
      const stripeCustomers = await stripe.customers.create({
        email: user?.email.toString(),
      });

      await UserModel.update(
        { stripeClientId: customerId },
        { where: { id: userId } }
      )
      customerId = stripeCustomers.id;
    }

    const successUrl = process.env.STRIPE_SUCCESS_URL as string
    const failUrl = process.env.STRIPE_CANCEL_URL as string
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: process.env.STRIPE_PRICE, quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: failUrl
    })

    return { sessionId: stripeCheckoutSession.id }
  }
}
