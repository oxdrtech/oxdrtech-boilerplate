import { NextFunction, Request, Response } from "express";
import { ResFailedException } from "../errs";
import { UserRepository } from "../../database/typeorm.repositories";
import { UserRole } from "../../database/entities/user.entity";
import { ValidateTokenAuthService } from "../../modules/auth/services/validateTokenAuth.service";

/**
 * Níveis de acesso:
 * - ALL: Qualquer usuário autenticado
 * - ADMIN: Apenas administradores
 */
type GuardLevel = "ALL" | "ADMIN";

export function authGuard(accessLevel: GuardLevel = "ALL") {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new ResFailedException(
          ["Token não enviado!"],
          { status: 401 },
        );
      }

      const { valid, decoded } = await ValidateTokenAuthService.execute(token);
      if (!valid || !decoded) {
        throw new ResFailedException(
          ["Token inválido!"],
          { status: 401 },
        );
      }

      const user = await UserRepository.findOne({
        where: { id: decoded.sub as string },
        withDeleted: true,
      });

      if (!user) {
        throw new ResFailedException(
          ["Usuário não encontrado!"],
          { status: 404 },
        );
      }

      // Controle de acesso por nível
      const role: UserRole = user.role;
      if (accessLevel === "ADMIN" && role !== UserRole.ADMIN) {
        throw new ResFailedException(
          ["Acesso restrito a administradores!"],
          { status: 403 },
        );
      }

      req.user = user;

      next();
    } catch (error) {
      if (error instanceof ResFailedException) throw error;
      throw error;
    }
  };
};
