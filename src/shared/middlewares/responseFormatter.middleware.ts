import { Request, Response, NextFunction } from "express";

export function responseFormatter(_req: Request, res: Response, next: NextFunction) {
  res.success = function (
    data: any = null,
    props?: { message?: string, status?: number },
  ) {
    res.status(props?.status ?? 200).json({
      success: true,
      message: props?.message ?? "Requisição concluída com sucesso",
      data
    });
  };

  res.failed = function (
    errors: string[] = ["Requisição inválida"],
    props?: { message?: string, status?: number },
  ) {
    res.status(props?.status ?? 400).json({
      success: false,
      message: props?.message ?? "Requisição inválida",
      data: { errors },
    });
  }

  next();
}
