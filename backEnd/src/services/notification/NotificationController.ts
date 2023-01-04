import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import Create from "./Create";
import Get from "./Get";
import { ICreateNotificationData } from "./types";

export default class NotificationController {
  async get(req: Request, res: Response) {
    const { id } = req.params
    try {
      const get = new Get()
      const notifications = await get.execute(Number(id));
      return res.status(200).json({ notifications });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async create(req: Request, _res: Response) {
    const notificationData: ICreateNotificationData = req.body

    const create = new Create();
    try {
      await create.execute(notificationData);
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}