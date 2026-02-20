import { UserRepository } from "../../../infra/database/typeorm.repositories";
import { userSelectedFields } from "../domain/selectors/user.selectors";

export class ListUserService {
  static async execute() {
    try {
      return await UserRepository.find({
        select: userSelectedFields,
      });
    } catch (err) {
      throw err;
    }
  }
}
