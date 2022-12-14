import SubCommentModel from "../../database/models/SubCommentModel";
import { ICommentGenericReturn, IsubComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";

export default class UpdateSubComment {
  async execute(subComment: IsubComments): Promise<ICommentGenericReturn> {
    try {
      return { message: 'Comentário atualizado com sucesso!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}