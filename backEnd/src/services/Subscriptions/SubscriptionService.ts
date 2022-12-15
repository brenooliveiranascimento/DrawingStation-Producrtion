import Subscription from "../../database/models/Subscription";

interface IExecuteSubs {
  userId: number;
}

export default class SubscriptionService {
  async execute({ userId }: IExecuteSubs) {
    return userId
  }
}
