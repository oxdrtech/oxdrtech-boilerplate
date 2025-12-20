import { randomUUID } from "crypto";
import { Login } from "../../../database/entities/login.entity";
import { User } from "../../../database/entities/user.entity";
import { LoginRepository } from "../../../database/typeorm.repositories";

export class RegisterLoginAuthService {
  static async execute(user: User, ipAddress: string, userAgent: string) {
    try {
      const login = new Login();
      Object.assign(login, {
        id: randomUUID(),
        user: user,
        ipAddress,
        userAgent: userAgent,
      });
      await LoginRepository.save(login);
    } catch (err) {
      throw err;
    }
  }
}
