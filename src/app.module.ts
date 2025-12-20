import { Application } from 'express';
import { TypeormService } from './database/typeorm.service';
import { MinioService } from './integrations/minio/minio.service';
import { AppController } from './app.controller';
import { responseFormatter } from './shared/middlewares/responseFormatter.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';


export class AppModule {
  static async configure(app: Application) {
    // 1. Configuraçôes de storage
    await TypeormService.initialize();
    await MinioService.initialize();

    // 2. Configuração da rota getInfo
    app.get("/", AppController.setupRoutes());

    // 3. Formatadores de request e response
    app.use(responseFormatter);

    // 4. Configuração dos módulos
    AuthModule.initialize(app);
    UserModule.initialize(app);
  }
}
