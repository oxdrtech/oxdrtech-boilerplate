import * as argon2 from 'argon2';
import { UserRepository } from "../../../database/typeorm.repositories";
import { ResFailedException } from "../../../shared/errs";
import { SigninAuthSchema } from "../domain/schemas/signin-auth.schema";
import { GenerateTokenAuthService } from "./generateTokenAuth.service";
import { RegisterLoginAuthService } from './registerLoginAuth.service';

export class SigninAuthService {
  static async execute(data: SigninAuthSchema, ipAddress: string, userAgent: string) {
    try {
      const user = await UserRepository.findOne({
        where: { email: data.email },
      });

      if (!user) throw new ResFailedException(
        ['Credenciais inválidas!'],
        { status: 404 },
      );

      const passwordMatch = await argon2.verify(user.password, data.password);

      if (!passwordMatch) throw new ResFailedException(
        ['Credenciais inválidas!'],
        { status: 404 },
      );

      const token = await GenerateTokenAuthService.execute(user);
      await RegisterLoginAuthService.execute(user, ipAddress, userAgent);
      return token;
    } catch (err) {
      throw err;
    }
  }
}
