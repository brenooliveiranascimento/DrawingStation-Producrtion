import { Request, Response } from "express";
import { allComments } from "../interfaces/commentsTypes";

interface ICommentsProps {
  getAll: () => Promise<allComments>
}

export default class CommentController {
  constructor(private commentsService: ICommentsProps) {
    this.commentsService = commentsService;
  }

  async getAll(req: Request, res: Response) {
    const comments = await this.commentsService.getAll();
  }
}