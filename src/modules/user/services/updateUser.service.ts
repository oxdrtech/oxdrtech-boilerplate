import { UserRepository } from "../../../database/typeorm.repositories";
import { ResFailedException } from "../../../shared/errs";
import { UpdateUserSchema } from "../domain/schemas/update-user.schema";
import { userSelectedFields } from "../domain/selectors/user.selectors";

export class UpdateUserService {
  static async execute(id: string, body: UpdateUserSchema) {
    try {
      const userUpdated = await UserRepository.update(id, body);

      if (userUpdated.affected === 0) throw new ResFailedException(
        ['Usuário não encontrado!'],
        { status: 404 },
      );

      return await UserRepository.findOne({
        where: { id },
        select: userSelectedFields,
      });
    } catch (err) {
      throw err;
    }
  }
}
