import { Request, Response } from "express";
import { IallComments, ICommentGenericReturn, IComments, ICommentUpdate } from "../../interfaces/commentsTypes";

interface ICommentsProps {
  getAll: { execute: (id:number) => Promise<IallComments> };
  create: { execute: (comment: IComments) => Promise<string> };
  update: { execute: (comment: ICommentUpdate) => Promise<string> };
  delete: { execute: (comment: ICommentUpdate) => Promise<string> };
}

export default class CommentController {
  constructor(private commentsService: ICommentsProps) {
    this.commentsService = commentsService;
  }

  async getAll(req: Request, res: Response) {
    const { id } = req.params;
    const comments = await this.commentsService.getAll.execute(Number(id));
    res.status(200).json(comments)
  }

  async create(req: Request, res: Response) {
    const comment: IComments = req.body;
    const create = await this.commentsService.create.execute(comment);
    res.status(201).json(create);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData: ICommentUpdate = req.body;
    const updateArgs = { ...updateData, id: Number(id) }
    const createComment = await this.commentsService
      .update.execute(updateArgs);
    res.status(201).json(createComment);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const updateData: ICommentUpdate = req.body;
    const updateArgs = { ...updateData, id: Number(id) }
    const deleteComment = await this.commentsService
      .delete.execute(updateArgs);
    res.status(201).json(deleteComment);
  }
}