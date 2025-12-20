import { UserRepository } from "../../../database/typeorm.repositories";
import { userSelectedFields } from "../domain/selectors/user.selectors";

export class FindUsersService {
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
