import { Application } from 'express';
import { router } from './infra/auth.route';

export class AuthModule {
  static initialize(app: Application) {
    app.use('/auth', router);
  }
}
