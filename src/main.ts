import 'dotenv/config';
import { TracerService } from './infra/tracing/tracer.service';
import express from 'express';
import cors from 'cors';
import { AppModule } from './app.module';
import { errorHandler } from './shared/handlers/error.handler';
import { configs } from './configs/configs';
import { createServer } from 'http';
import { SocketConfig } from './infra/socket/socket.config';

async function bootstrap() {
  await TracerService.initialize();

  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(express.json());

  await AppModule.configure(app);

  app.use(errorHandler);

  const PORT = configs.project.port;
  httpServer.listen(PORT, () => {
    SocketConfig.initialize(httpServer);
    console.log(`🚀 On ${PORT}`);
    console.log('✨============================================✨');
  });
}
bootstrap();
