import type { Request, Response } from "express";
import { estado_citaModels } from "../models/estado_citas.models";

export const getallestado_citas = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Estado de citas']
#swagger.summary = 'Obtener los estado de citas'
*/
  try {
    const resutado = await estado_citaModels.findall();
    res.json({ datos: resutado });
  } catch (error) {
    res.status(500).json({ message: "error al obtener estado de citas" });
  }
};
