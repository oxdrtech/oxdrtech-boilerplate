import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppModule } from './app.module';
import { errorHandler } from './shared/handlers/error.handler';
import { configs } from './shared/configs/configs';

async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await AppModule.configure(app);

  app.use(errorHandler);

  const PORT = configs.project.port;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log('✨============================================✨');
  });
}
bootstrap();
