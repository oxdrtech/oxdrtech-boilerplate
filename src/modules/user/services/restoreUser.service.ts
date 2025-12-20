import { UserRepository } from "../../../database/typeorm.repositories";
import { ResFailedException } from "../../../shared/errs";

export class RestoreUserService {
  static async execute(id: string) {
    try {
      const user = await UserRepository.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!user) throw new ResFailedException(
        ['Usuário não encontrado!'],
        { status: 404 },
      );

      await UserRepository.restore(id);
    } catch (err) {
      throw err;
    }
  }
}
