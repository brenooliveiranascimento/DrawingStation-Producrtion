import SignatureModel from "../../database/models/SignatureModel";
import CustomError from "../../utils/StatusError";

export default class GetSignature {
  async execute(id: number) {
    try {
      const signature = SignatureModel.findOne({ where: { id } })
      return signature
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}