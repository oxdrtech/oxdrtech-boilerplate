import { Application } from 'express';
import { router } from './infra/user.route';

export class UserModule {
  static initialize(app: Application) {
    app.use('/users', router);
  }
}
