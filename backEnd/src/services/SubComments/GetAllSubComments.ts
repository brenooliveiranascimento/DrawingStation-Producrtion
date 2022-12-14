import SubCommentModel from "../../database/models/SubCommentModel";
import { IsubComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";

export default class GetAllSubComments {
  constructor(private subCommentModel = SubCommentModel) {}

  async execute(): Promise<IsubComments[]> {
    try {
      const subComments = await this.subCommentModel.findAll();
      return subComments as IsubComments | any;
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}