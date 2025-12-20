import { sign, type SignOptions } from "jsonwebtoken";
import { User } from "../../../database/entities/user.entity";
import { configs } from "../../../shared/configs/configs";

export class GenerateTokenAuthService {
  static async execute(user: User, resetPassword?: boolean) {
    try {
      const payload = {
        sub: user.id,
      };

      const options: SignOptions = {
        expiresIn: resetPassword ? "15m" : "1d",
        issuer: configs.jwt.issuer,
        audience: configs.jwt.audience,
      };

      const token = sign(payload, configs.jwt.secret, options);
      return { token };
    } catch (err) {
      throw err;
    }
  }
}
