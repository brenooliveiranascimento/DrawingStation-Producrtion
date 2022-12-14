import SubCommentModel from "../../database/models/SubCommentModel";
import { ICommentGenericReturn, IsubCommentsEdit } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import ValidateSubComment from "./ValidateSubComment";

export default class DeleteSubComment {
  constructor(
    private validateSubcomment = new ValidateSubComment(),
    private subCommentModel = SubCommentModel
    ) {}
  async execute(subComment: IsubCommentsEdit): Promise<ICommentGenericReturn> {
    const { id } = subComment;
    try {
      await this.validateSubcomment.checkSubCommentUpdate({ ...subComment, content: 'Delete' });
      await this.subCommentModel.update(
        { active: false },
        { where: { id } }
      )
      return { message: 'Comentário deletado com sucesso!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}