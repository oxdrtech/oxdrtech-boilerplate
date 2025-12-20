import { NextFunction, Request, Response } from "express";
import { ResFailedException } from "../errs";
import { UserRole } from "../../database/entities/user.entity";

/**
 * Guard de usuário para rotas que recebem um parâmetro de alvo (ex.: :id)
 *
 * Regras (projeto sem plataforma):
 * - ADMIN: pode alterar/excluir/criar para qualquer usuário
 * - USER: só pode alterar/excluir/criar dados do próprio usuário
 *
 * Observação: o guard só restringe métodos de escrita (POST, PUT, PATCH, DELETE).
 * Métodos de leitura (GET, HEAD, OPTIONS) passam sem validação adicional aqui.
 */
export function userGuard(paramKey: string = "id") {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const requester = req.user;
    const targetId = req.params[paramKey];

    if (!requester) {
      throw new ResFailedException(
        ["Usuário não autenticado!"],
        { status: 401 },
      );
    }

    const method = req.method.toUpperCase();
    const isWriteMethod = method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";

    // Para métodos de leitura, não restringimos aqui (deixe outros guards cuidarem se necessário)
    if (!isWriteMethod) return next();

    // ADMIN pode escrever sobre qualquer usuário
    if (requester.role === UserRole.ADMIN) return next();

    // USER só pode escrever sobre seu próprio recurso
    if (requester.role === UserRole.USER) {
      if (!targetId || requester.id !== targetId) {
        throw new ResFailedException(
          ["Você só pode modificar seus próprios dados!"],
          { status: 403 },
        );
      }
      return next();
    }

    // Caso apareça um role desconhecido
    throw new ResFailedException(
      ["Perfil de acesso inválido!"],
      { status: 403 });
  };
};
