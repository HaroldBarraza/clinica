import type { Request, Response } from "express";
import { citasModels } from "../models/citas.models";

export const getall = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await citasModels.findall();
    res.json({ datos: resultado });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const filterdocto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name_empleado, fecha_inicio, fecha_final } = req.query;
    if (
      !name_empleado ||
      !fecha_inicio ||
      !fecha_final ||
      typeof name_empleado !== "string"
    ) {
      res.status(400).json({ error: "todos los campos son obligatorios" });
      return;
    }
    const fechainicio = new Date(fecha_inicio as string);
    const fechafinal = new Date(fecha_final as string);

    if (isNaN(fechainicio.getTime()) || isNaN(fechafinal.getTime())) {
      res.status(400).json({
        error: "el formato de la fecha es incorrecto, use este YYYY-MM-DD",
      });
      return;
    }
    if (fechainicio < fechafinal) {
      res.status(400).json({
        error: "la fecha inicial tiene que ser menor a la fecha final ",
      });
      return;
    }
    const resultado = await citasModels.filterwithdoctor(
      name_empleado,
      fechainicio,
      fechafinal,
    );
    res.json({ data: resultado });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const filterforboss = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { especialidad, fecha_inicio } = req.query;
    if (!especialidad || !fecha_inicio || typeof especialidad !== "string") {
      res.status(400).json({ error: "todo los parametros son necesarios" });
      return;
    }
    const fecha = new Date(fecha_inicio as string);
    if (isNaN(fecha.getTime())) {
      res
        .status(400)
        .json({ error: "el formato de la fecha es incorrecto YYYY-MM-DD" });
      return;
    }
    const resultado = await citasModels.filterforboss(especialidad, fecha);
    res.json({ data: resultado });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
