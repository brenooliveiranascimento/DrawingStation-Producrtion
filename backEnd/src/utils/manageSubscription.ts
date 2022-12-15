import { stripe } from './stripe';
import UserModel from '../database/models/UserModel';
import SubscriptionModel from '../database/models/Subscription';


export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
) => {

  const user = await UserModel.findOne({
    where: { stripeClientId: customerId },
    include: { model: SubscriptionModel, as: 'subscription'  }
  })

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);


  const subscriptionData = {
    id: subscription.id,
    userId: user?.id,
    status: subscription.status,
    priceId: subscription.items.data[0].id,
  }

  if(createAction) {
    console.log(subscriptionData);
    try {

      await SubscriptionModel.create({
        
      })

    } catch(e: any) {
      console.log("ERRO CREATE")
      console.log(e)
    }
  }

}
