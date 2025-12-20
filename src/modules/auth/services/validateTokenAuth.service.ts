import { verify, type VerifyOptions, type JwtPayload } from "jsonwebtoken";
import { configs } from "../../../shared/configs/configs";

export class ValidateTokenAuthService {
  static async execute(token: string) {
    try {
      const options: VerifyOptions = {
        issuer: configs.jwt.issuer,
        audience: configs.jwt.audience,
      };

      const decoded = verify(token, configs.jwt.secret, options) as JwtPayload;
      return { valid: true, decoded };
    } catch (err) {
      return { valid: false, decoded: null };
    }
  }
}
