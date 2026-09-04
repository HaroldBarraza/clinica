import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";

export const validardatosquery =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.query = await schema.parseAsync(req.query) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.issues,
        });
        return;
      }
      res.status(500).json({
        message: "error interno en el servidor validar query",
      });
    }
  };
