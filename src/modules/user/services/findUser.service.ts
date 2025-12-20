import { UserRepository } from "../../../database/typeorm.repositories";
import { ResFailedException } from "../../../shared/errs";
import { userSelectedFields } from "../domain/selectors/user.selectors";

export class FindUserService {
  static async execute(id: string) {
    try {
      const user = await UserRepository.findOne({
        where: { id },
        select: userSelectedFields,
      });

      if (!user) throw new ResFailedException(
        ['Usuário não encontrado!'],
        { status: 404 },
      )

      return user;
    } catch (err) {
      throw err;
    }
  }
}
