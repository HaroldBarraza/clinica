import type { Response, Request } from "express";
import { especialidadModels } from "../models/especialidades.models";

export const getall = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Especialidad']
#swagger.summary = 'Obtener especiliadades'
*/

  try {
    const resultado = await especialidadModels.findall();
    res.json({ datos: resultado });
  } catch (error) {
    res.status(500).json({ message: "error al obtener las especialidades" });
  }
};
export const createespecialidad = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Especialidad']
#swagger.summary = 'Crear especiliadad'
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name_especialidad: { type: 'number', example: 'Cardiologia' },
          descripcion_especialidad: { type: 'number', example: 'Se centra en corazon' },
        },
        required: ['name_especialidad', 'descripcion_especialidad']
      }
    }
  }
}

*/

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
  } catch (error) {
    res.status(500).json({ menssage: "error al crear una nueva especialidad" });
  }
};
