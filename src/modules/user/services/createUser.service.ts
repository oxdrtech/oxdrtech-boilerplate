import { PgError } from '../../../infra/database/types/pgError';
import { ResFailedException } from '../../../shared/errs';
import { CreateUserDTO } from '../domain/schemas/create-user.schema';
import { User } from '../../../infra/database/entities/user.entity';
import { randomUUID } from 'crypto';
import { UserRepository } from '../../../infra/database/typeorm.repositories';

export class CreateUserService {
  private static readonly UNIQUE_CONSTRAINT_ERRORS = {
    name: 'Já existe um usuário com esse nome!',
    email: 'Já existe um usuário com esse email!',
  } as const;

  static async execute(body: CreateUserDTO) {
    try {
      const user = new User();
      Object.assign(user, {
        id: randomUUID(),
        ...body,
      });

      return await UserRepository.save(user);
    } catch (err) {
      const pgErr = err as PgError;

      if (pgErr.code === '23505') {
        const constraintField = Object.keys(this.UNIQUE_CONSTRAINT_ERRORS)
          .find(field => pgErr.detail?.includes(field)) as keyof typeof this.UNIQUE_CONSTRAINT_ERRORS;

        if (constraintField) {
          throw new ResFailedException(
            [this.UNIQUE_CONSTRAINT_ERRORS[constraintField]],
            { status: 409 },
          )
        }
      }

      throw err;
    }
  }
}
