import type { Response, Request } from "express";
import { especialidadModels } from "../models/especialidades.models";

export const getall = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await especialidadModels.findall();
    res.json({ datos: resultado });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
export const createespecialidad = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name_especialidad, descripcion_especialidad } = req.body;
    if (!name_especialidad) {
      res.status(400).json({ error: "todos los campos son obligatorios" });
    }
    const created = await especialidadModels.create_especialidad(
      name_especialidad,
      descripcion_especialidad || "no hay descripcion",
    );
    res.status(200).json({ data: created });
  } catch (error: any) {
    res.status(500).json({ menssage: error });
  }
};
