import { HttpException } from "./http.exception";

export class ResFailedException extends HttpException {
  constructor(
    errors: string[] = ["Requisição inválida"],
    props?: { message?: string, status?: number },
  ) {
    super(
      props?.message ?? "Requisição inválida",
      props?.status ?? 400,
      false,
      { errors },
    );
  }
}
