import Subscription from "../../database/models/Subscription";
import UserModel from '../../database/models/UserModel';
import Stripe from 'stripe';
import 'dotenv';

interface IExecuteSubs {
  userId: number;
}

export default class SubscriptionService {
  async execute({ userId }: IExecuteSubs) {


    const stripeKey = process.env.STRIPE_API_KEY as string;

    const stripe = new Stripe(
      stripeKey,
      {
        apiVersion: '2022-11-15',
        appInfo: {
          name: 'DrawingStation',
          version: '1'
        }
      }
    );
    

    const user = await UserModel.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    return user
  }
}
