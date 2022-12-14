import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, IComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import CheckComment from "./CheckComment";

export default class CreateComment {
  constructor(
    private commentModel = CommentModel,
    private checkComment = new CheckComment()
    ){}

  async execute(comment: IComments): Promise<ICommentGenericReturn> {
    try {
      await this.checkComment.commentCheckList(comment);
      await this.commentModel.create({ ...comment, creationDate: new Date(), active: true }) 
      return { message: 'Comentario adicionado com sucesso!!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
    
  }
}