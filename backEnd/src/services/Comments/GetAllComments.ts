import CommentModel from "../../database/models/CommentModel";
import SubCommentModel from "../../database/models/SubCommentModel";
import { IallComments, IAllSubCommentsUserData, IComments, IsubComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import Users from "../../database/models/UserModel";

export default class GetAllCommentsServices {
  constructor(private commentModel = CommentModel) {}

  private async getComments() {
    const comments = await this.commentModel.findAll(
      {
        include: [{ model: SubCommentModel, as: 'subComments' }],
        where: { active: true },
        attributes: { exclude: ['classroomId', 'active', 'commentId'] }
      });
    return comments
  }

  private filterActiveComments(comments: any): IallComments[] {
    return comments.map((
      { active, classroomId, content, creationDate, id, userId, subComments}: IallComments) => {
        const filterSuibComments = subComments.filter((currSubComments: IsubComments) => currSubComments.active);
        const items = {
          id, userId, active, classroomId, content, subComments: filterSuibComments, creationDate
        }
        return items
    });
  }

  private async requestUser(id: number) {
    const user = await Users.findByPk(Number(id), { attributes: {
      exclude: ['password', 'birthday', 'phoneNumber', 'loginType']
    }});
    return user;
  }

  private async AddUserDataInMainComment(comments: IallComments[]) {
    const commentsWithUsers = await Promise.all(comments.map(async (currComment: IallComments) => {
      const userData = await this.requestUser(Number(currComment.userId));
      return { userData, ...currComment }
  }));
  return commentsWithUsers;
  }

  private async addUserDataInSubComment(comments: any) {
    const addUserInSubComment = await Promise.all(comments.map(async (currComment: IAllSubCommentsUserData) => {
      const subComments = await Promise.all(currComment.subComments.map(async (currSubComment: IsubComments) => {
        const getUserData = await this.requestUser(Number(currSubComment.userId));
        const userData = {
          name: getUserData?.name, email: getUserData?.email,
          profilePhoto: getUserData?.profilePhoto,active: getUserData?.active,
          premium: getUserData?.premium
        };
        const { active, commentId, content, creationDate, id } = currSubComment;
        const currData = { active, commentId, content, creationDate, id };
        return { userData, ...currData };
      }))
      const { active, classroomId, content, creationDate, userData } = currComment;
      const currData = {userData, active, classroomId, content, creationDate};
      return { ...currData, subComments };
    }))
    return addUserInSubComment;
  }

  private async addUserDataInComments(comments: IallComments[]): Promise<IallComments> {
    const commentsWithUsers = await this.AddUserDataInMainComment(comments);
    const addUserInSubComment = await this.addUserDataInSubComment(commentsWithUsers);
    return addUserInSubComment as any;
  }

  async execute(): Promise<IallComments> {
    try {
      const comments = await this.getComments();

      const activeComments = this.filterActiveComments(comments) as any;
      const commentsWithUsers = await this.addUserDataInComments(activeComments);
      return commentsWithUsers;
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}