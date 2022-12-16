import { Request, Response } from "express";
import SubscriptionService from "./SubscriptionService";
import UserPortalService from "./UserPortslService";

export default class SubcriptionController {

  constructor() {}

  async init(req: Request, res: Response) {
    const { userId } = req.body;

    const subscribeService = new SubscriptionService()
    const subscribe = await subscribeService.execute({ userId });
    return res.status(201).json(subscribe);
  }

  async portal(req: Request, res:Response) {
    const { userId } = req.params;

    const portalService = new UserPortalService();
    const portalUrl = await portalService.execute(Number(userId));
    console.log(portalUrl, 'ADWDWDW')
    return res.status(200).json({portalUrl});
  }
}