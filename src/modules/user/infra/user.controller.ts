import { Request, Response } from 'express';
import { CreateUserService } from '../services/createUser.service';
import { FindUserService } from '../services/findUser.service';
import { UpdateUserService } from '../services/updateUser.service';
import { DeleteUserService } from '../services/deleteUser.service';
import { RestoreUserService } from '../services/restoreUser.service';
import { ResFailedException } from '../../../shared/errs';
import { ListUserService } from '../services/listUser.service';

export class UserController {
  static async create(req: Request, res: Response) {
    const result = await CreateUserService.execute(req.validatedBody);
    res.success(result, { status: 201 });
  }

  static async me(req: Request, res: Response) {
    if (!req.user) throw new ResFailedException(
      ['Usuário não autenticado'],
      { status: 401 },
    );
    const { password, ...me } = req.user;
    res.success(me);
  }

  static async list(_req: Request, res: Response) {
    const result = await ListUserService.execute();
    res.success(result);
  }

  static async find(req: Request, res: Response) {
    const result = await FindUserService.execute(req.params.id);
    res.success(result);
  }

  static async update(req: Request, res: Response) {
    const result = await UpdateUserService.execute(req.params.id, req.validatedBody);
    res.success(result);
  }

  static async delete(req: Request, res: Response) {
    await DeleteUserService.execute(req.params.id);
    res.success('Usuário deletado com sucesso!');
  }

  static async restore(req: Request, res: Response) {
    await RestoreUserService.execute(req.params.id);
    res.success('Usuário restaurado com sucesso!');
  }
}
