import { UserRole } from "../../../database/entities/user.entity";
import { UserRepository } from "../../../database/typeorm.repositories";
import { CreateUserService } from "../../user/services/createUser.service";
import { SignupAuthSchema } from "../domain/schemas/signup-auth.schema";
import { GenerateTokenAuthService } from "./generateTokenAuth.service";
import { RegisterLoginAuthService } from "./registerLoginAuth.service";

export class SignupAuthService {
  static async execute(data: SignupAuthSchema, ipAddress: string, userAgent: string) {
    try {
      const users = (await UserRepository.count()) > 0;
      const newUser = await CreateUserService.execute({
        ...data,
        role: users ? UserRole.USER : UserRole.ADMIN,
        authorized: true,
      });

      const token = await GenerateTokenAuthService.execute(newUser);
      await RegisterLoginAuthService.execute(newUser, ipAddress, userAgent);
      return token;
    } catch (err) {
      throw err;
    }
  }
}
