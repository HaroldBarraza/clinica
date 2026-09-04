import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";

export const validardatos =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.issues,
        });
        return;
      }
      res.status(500).json({
        message: "error interno en el servidor validar datos",
      });
    }
  };
