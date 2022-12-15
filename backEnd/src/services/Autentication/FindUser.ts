import Users from "../../database/models/UserModel"
import { errorMapTypes } from "../../utils/errorMap"
import CustomError from "../../utils/StatusError"

export default class FindUser {
  async findAUser(email: string) {
    try {
      const findUser = await Users.findOne({
        where: { email }
      })
      if(!findUser) return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null }
      if(!findUser) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404)
      return { error: null, message: findUser }
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}