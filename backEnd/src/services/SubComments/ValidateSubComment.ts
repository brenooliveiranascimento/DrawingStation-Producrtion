import { IsubComments } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import CommentModel from "../../database/models/CommentModel";
import Users from "../../database/models/UserModel";

export default class ValidateSubComment {
  async checkNewSubComment(subComment: IsubComments): Promise<boolean> {
    const { commentId, content, userId } = subComment;
    try {
      const comment = await CommentModel.findByPk(Number(commentId));
      const user = await Users.findByPk(Number(userId));
  
      if(!content.length) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
      if(!commentId || !comment) throw new CustomError(errorMapTypes.COMMENT_NOT_FOUND, 404);
      if(!user || !user) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404);
      return true
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}