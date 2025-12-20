import { Request, Response } from "express";
import { SignupAuthService } from "../services/signupAuth.service";
import { extractIp } from "../../../shared/utils/extractIp";
import { extractUserAgent } from "../../../shared/utils/extractUserAgent";
import { SigninAuthService } from "../services/signinAuth.service";

export class AuthController {
  static async signup(req: Request, res: Response) {
    const ipAddress = extractIp(req);
    const userAgent = extractUserAgent(req);
    const result = await SignupAuthService.execute(req.validatedBody, ipAddress, userAgent);
    res.success(result, { status: 201 });
  };

  static async signin(req: Request, res: Response) {
    const ipAddress = extractIp(req);
    const userAgent = extractUserAgent(req);
    const result = await SigninAuthService.execute(req.validatedBody, ipAddress, userAgent);
    res.success(result, { status: 201 });
  };
}
