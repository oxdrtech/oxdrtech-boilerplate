import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, z } from "zod";

type PartialSchemas = {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
  headers?: ZodObject<ZodRawShape>;
};

type RootSchema = ZodObject<{
  body?: ZodObject<ZodRawShape> | undefined;
  query?: ZodObject<ZodRawShape> | undefined;
  params?: ZodObject<ZodRawShape> | undefined;
  headers?: ZodObject<ZodRawShape> | undefined;
}>;

export function validateSchema(schemas: PartialSchemas | RootSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isRootSchema = schemas instanceof z.ZodObject &&
        (schemas.shape as any) && ("query" in (schemas.shape as any) || "body" in (schemas.shape as any));

      const collectedErrors: string[] = [];

      // Se for schema raiz, extrai as partes; caso contrário usa diretamente.
      const parts: PartialSchemas = isRootSchema
        ? {
            body: (schemas as RootSchema).shape.body as any,
            query: (schemas as RootSchema).shape.query as any,
            params: (schemas as RootSchema).shape.params as any,
            headers: (schemas as RootSchema).shape.headers as any,
          }
        : (schemas as PartialSchemas);

      if (parts.body) {
        const parsed = await parts.body.safeParseAsync(req.body);
        if (!parsed.success) {
          collectedErrors.push(
            ...parsed.error.issues.map((err) => `${["body", ...err.path].join(".")}: ${err.message}`)
          );
        } else {
          req.validatedBody = parsed.data;
        }
      }

      if (parts.query) {
        const parsed = await parts.query.safeParseAsync(req.query);
        if (!parsed.success) {
          collectedErrors.push(
            ...parsed.error.issues.map((err) => `${["query", ...err.path].join(".")}: ${err.message}`)
          );
        } else {
          req.validatedQuery = parsed.data;
        }
      }

      if (parts.params) {
        const parsed = await parts.params.safeParseAsync(req.params);
        if (!parsed.success) {
          collectedErrors.push(
            ...parsed.error.issues.map((err) => `${["params", ...err.path].join(".")}: ${err.message}`)
          );
        } else {
          req.validatedParams = parsed.data;
        }
      }

      if (parts.headers) {
        const parsed = await parts.headers.safeParseAsync(req.headers);
        if (!parsed.success) {
          collectedErrors.push(
            ...parsed.error.issues.map((err) => `${["headers", ...err.path].join(".")}: ${err.message}`)
          );
        } else {
          req.validatedHeaders = parsed.data;
        }
      }

      if (collectedErrors.length > 0) {
        res.failed(collectedErrors);
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno no validateSchema',
        data: { errors: [error instanceof Error ? error.message : 'Erro desconhecido'] }
      });
    }
  };
}
