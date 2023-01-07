import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import AnualSubscriptionService from "./AnualSubscriptionService";
import GetSignature from "./GetSignature";
import SubscriptionService from "./SubscriptionService";
import UserPortalService from "./UserPortslService";

export default class SubcriptionController {

  constructor() {}

  async initMensalSubscription(req: Request, res: Response) {
    const { userId } = req.body;

    const subscribeService = new SubscriptionService()
    const subscribe = await subscribeService.execute({ userId });
    return res.status(201).json(subscribe);
  }

  async initAnualSubscription(req: Request, res: Response) {
      const { userId } = req.body;

      const subscribeService = new AnualSubscriptionService()
      const subscribe = await subscribeService.execute({ userId });
      return res.status(201).json(subscribe);
  }

  async initPortal(req: Request, res:Response) {
    const { userId } = req.params;

    const portalService = new UserPortalService();
    const portalUrl = await portalService.execute(Number(userId));
    return res.status(200).json({portalUrl});
  }

  async get(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const portalService = new GetSignature();
      const signature = await portalService.execute(Number(id)) || null;
      return res.status(200).json({signature});
    } catch(e: any) {
      throw new CustomError(e.message, 401);
    }
  }
}