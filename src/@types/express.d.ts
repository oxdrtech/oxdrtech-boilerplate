import 'express';
import { User } from '../infra/database/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      validatedBody?: any;
      validatedQuery?: any;
      validatedParams?: any;
      validatedHeaders?: any;
    }

    interface Response {
      success(
        data?: any,
        props?: { message?: string; status?: number },
      );

      failed(
        errors: string[],
        props?: { message?: string, status?: number },
      );
    }
  }
}
