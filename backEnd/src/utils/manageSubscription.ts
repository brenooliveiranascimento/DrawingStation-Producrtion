import { stripe } from './stripe';
import UserModel from '../database/models/UserModel';
import SignatureModel from '../database/models/SignatureModel';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  anual = false,
) {
  const user = await UserModel.findOne({
    where: { stripeClientId: customerId },
    include: { model: SignatureModel, as: 'signature' }
  }) as any

  let subscription: any
  let subscriptionData: any;
  if(anual) {
    subscription = await stripe.paymentIntents.retrieve(subscriptionId);
    subscriptionData = {
      id: subscription.id,
      userId: user?.id,
      status: subscription.status,
      priceId: process.env.STRIPE_ANUAL_PRICE,
    }
  } else {
   subscription = await stripe.subscriptions.retrieve(subscriptionId);
   subscriptionData = {
    id: subscription.id,
    userId: user?.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  }
  }
  // const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // const subscription = await stripe.payouts.retrieve(subscriptionId);


  if(createAction) {
    try {
      await SignatureModel.create({
        id: subscription.id,
        userId: user?.id,
        status: anual ? subscriptionData.status : 'active',
        priceId: anual ? subscriptionId : subscription.items.data[0].price.id,
      })

      await UserModel.update(
        { premium: true },
        { where: { id: user?.id } }
      )
      console.log('VIROU PREMIUM!!')

    } catch(e: any) {
      console.log("ERRO CREATE")
      console.log(e)
    }
  } else {
    if(deleteAction) {
      await SignatureModel.destroy(
        {where: { id: subscriptionId} }
      )
      await UserModel.update(
        { premium: false },
        { where: { id: user?.id } }
      )
      return;
    }

    try {
      await SignatureModel.update(
        { status: anual ? 'active' : subscription.status, priceId: anual ? subscriptionId : subscription.items.data[0].price.id, },
        { where: { id: subscriptionId } }
      )
    } catch(e) {
      console.log("Error Update Hook")
      console.log(e);
    }
  }

}
