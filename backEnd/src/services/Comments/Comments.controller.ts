import { Request, Response } from "express";
import { IallComments, ICommentGenericReturn, IComments, ICommentUpdate } from "../../interfaces/commentsTypes";

interface ICommentsProps {
  getAllComments: { execute: () => Promise<IallComments> };
  createComment: { execute: (comment: IComments) => Promise<ICommentGenericReturn> };
  updateComment: { execute: (comment: ICommentUpdate) => Promise<ICommentGenericReturn> };
}

export default class CommentController {
  constructor(private commentsService: ICommentsProps) {
    this.commentsService = commentsService;
  }

  async getAll(_req: Request, res: Response) {
    const comments = await this.commentsService.getAllComments.execute();
    res.status(200).json(comments)
  }

  async create(req: Request, res: Response) {
    const comment: IComments = req.body;
    const createComment = await this.commentsService.createComment.execute(comment);
    res.status(201).json(createComment);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData: ICommentUpdate = req.body;
    const updateArgs = { ...updateData, id: Number(id) }
    const createComment = await this.commentsService
      .updateComment.execute(updateArgs);
    res.status(201).json(createComment);
  }
}