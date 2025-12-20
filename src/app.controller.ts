import { Router, Request, Response } from 'express';
import { configs } from './shared/configs/configs';

export class AppController {
  static setupRoutes(): Router {
    const router = Router();
    router.get('/', this.getInfo);
    return router;
  }

  static async getInfo(_req: Request, res: Response) {
    res.status(200).json({
      project: configs.project.name,
      description: configs.project.description,
      owner: configs.project.owner,
      builder: configs.project.builder,
      statusCode: 200,
    });
  }
}
