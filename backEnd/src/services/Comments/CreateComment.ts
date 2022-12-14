import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, IComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";

export default class CreateComment {
  constructor(private commentModel = CommentModel){}

  async execute(comment: IComments): Promise<ICommentGenericReturn> {
    try {
      const create = await this.commentModel.create({...comment}) 
      return { message: 'Comentario adicionado com sucesso!!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
    
  }
}