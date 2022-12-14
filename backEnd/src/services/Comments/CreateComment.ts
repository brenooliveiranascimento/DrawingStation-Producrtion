import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, IComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import Users from "../../database/models/UserModel";
import Classroom from "../../database/models/ClassroomModel";
import { errorMapTypes } from "../../utils/errorMap";

export default class CreateComment {
  constructor(private commentModel = CommentModel){}

  private async commentCheckList(comment: IComments): Promise<boolean> {
    const { content, userId, classroomId } = comment;
    const user = await Users.findByPk(userId);
    const classroom = await Classroom.findByPk(classroomId);
    if(!content) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
    if(!userId || !user) throw new CustomError(errorMapTypes.USER_COMMENT_NOT_FOUND, 401);
    if(!classroomId || !classroom) throw new CustomError(errorMapTypes.CLASSROOM_COMMENT_NOT_FOUND, 401);
    return true
  }

  async execute(comment: IComments): Promise<ICommentGenericReturn> {
    try {
      await this.commentCheckList(comment);
      await this.commentModel.create({ ...comment, creationDate: new Date() }) 
      return { message: 'Comentario adicionado com sucesso!!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
    
  }
}