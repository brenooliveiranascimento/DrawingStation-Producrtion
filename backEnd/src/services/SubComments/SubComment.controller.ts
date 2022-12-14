import { Request, Response } from "express";
import { ICommentGenericReturn, IsubComments } from "../../interfaces/commentsTypes";

interface ISubcommentControllerProps {
  create: { execute: (subComment: IsubComments) => Promise<ICommentGenericReturn> }
}

export default class SubCommentControlelr {
  constructor(private props: ISubcommentControllerProps) {
    this.props = props;
  }

  async create(req: Request, res: Response) {
    const subComment: IsubComments = req.body;
    const create = await this.props.create.execute(subComment);
    res.status(201).json(create);
  }
}