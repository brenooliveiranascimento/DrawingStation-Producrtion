import { Request, Response } from "express";
import { ICommentGenericReturn, IsubComments, IsubCommentsEdit } from "../../interfaces/commentsTypes";

interface ISubcommentControllerProps {
  create: { execute: (subComment: IsubComments) => Promise<ICommentGenericReturn> },
  update: { execute: (subComment: IsubCommentsEdit) => Promise<ICommentGenericReturn> }
  delete: { execute: (subComment: IsubCommentsEdit) => Promise<ICommentGenericReturn> }
}

export default class SubCommentControlelr {
  constructor(private props: ISubcommentControllerProps) {
    this.props = props;
  }

  async create(req: Request, res: Response) {
    const subComment: IsubComments = req.body;
    const create = await this.props.create.execute(subComment);
    res.status(201).json({ message: create });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const editCommentData:IsubCommentsEdit = { ...req.body, id: Number(id)};
    const edit = await this.props.update.execute(editCommentData);
    res.status(200).json({ message: edit });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const editCommentData:IsubCommentsEdit = { ...req.body, id: Number(id)};
    const edit = await this.props.delete.execute(editCommentData);
    res.status(200).json({ message: edit });
  }
}
