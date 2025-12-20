import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errs';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) return next(error);

  if (error instanceof HttpException) {
    const status = error.status ?? 400;
    const message = error.message ?? "Requisição inválida";
    const errors = error.data?.errors ?? [message];

    if (typeof res.failed === "function") {
      res.failed(errors, { message, status });
    } else {
      res.status(status).json({
        success: false,
        message,
        data: { errors },
      });
    }
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Requisição inválida',
    data: {
      errors: ["Erro interno do servidor"],
    }
  });
};
