import { stripe } from "../../utils/stripe";
import UserModel from "../../database/models/UserModel";

interface IUserportalServerExecProp {
  userId: number
}

export default class UserPortalService {
  async execute({ userId }: IUserportalServerExecProp) {
    const user = await UserModel.findByPk(userId);
    const stripeClientId = user?.stripeClientId;

    if(!stripeClientId) return;

    const portalUrl = stripe.billingPortal.sessions.create({
      customer: stripeClientId,
      return_url: process.env.STRIPE_SUCCESS_URL,
    })

    return portalUrl
  }
}