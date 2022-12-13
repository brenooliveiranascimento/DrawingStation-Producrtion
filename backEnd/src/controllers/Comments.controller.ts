import { Request, Response } from "express";
import { IallComments } from "../interfaces/commentsTypes";

interface ICommentsProps {
  getAll: () => Promise<IallComments>
}

export default class CommentController {
  constructor(private commentsService: ICommentsProps) {
    this.commentsService = commentsService;
  }

  async getAll(req: Request, res: Response) {
    const comments = await this.commentsService.getAll();
    res.status(200).json(comments)
  }
}