import type { Request, Response } from "express";
import { usersModels } from "../models/users.models";
import { error } from "node:console";
import prisma from "../config/prisma";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Empleados']
#swagger.summary = 'Obtener todos los empleados'
*/

  try {
    const resultado = await usersModels.findall();
    res.json({ data: resultado });
  } catch (error) {
    res.status(500).json({ error: "hubo un error al obtener los empleados" });
  }
};
export const getmedicosbyespecialidad = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Empleados']
#swagger.summary = 'Obtener los medicos segun especialidad '
*/

  const especialidad = req.query.especialidad as string;
  try {
    if (!especialidad || typeof especialidad !== "string") {
      res.status(400).json({ error: "hubo un error" });
    }
    const existe = await prisma.especialidades.findFirst({
      where: {
        name_especialidad: {
          equals: especialidad,
          mode: "insensitive",
        },
      },
    });
    if (!existe) {
      res.status(400).json({ error: "la especialidad no existe " });
      return;
    }

    const resultado = await usersModels.findfilterespecialidad(especialidad);
    if (resultado.length === 0) {
      res.status(200).json({ message: "no hay medicos con esta especialidad" });
      return;
    }
    res.json({ data: resultado });
  } catch (error) {}
};

export const updateuser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* #swagger.tags = ['Empleados']
#swagger.summary = 'Actualizar datos de un empleado (solo el propio usuario)'
#swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del empleado a actualizar',
  required: true,
  type: 'integer'
}
#swagger.requestBody = {
  required: false,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'nuevo@email.com' },
          password: { type: 'string', example: 'nuevaClave123' },
          role: { type: 'string', enum: ['RECEPCIONISTA', 'MEDICO', 'GERENCIA'], example: 'MEDICO' },
          name_empleado: { type: 'string', example: 'Carlos' },
          appaterno: { type: 'string', example: 'García' },
          appmaterno: { type: 'string', example: 'Pérez' },
          telefono: { type: 'string', example: '987654321' }
        }
      }
    }
  }
}
 */

  try {
    const id_empleado = Number(req.params.id);
    if (isNaN(id_empleado)) {
      res.status(400).json({ error: "el id tiene que se un numero valido" });
      return;
    }
    const existe = await usersModels.findbyIdUsers(id_empleado);
    if (!existe) {
      res.status(400).json({ error: "el empleado con este id no existe" });
      return;
    }
    const usuarioAuth = req.user;

    if (!usuarioAuth || usuarioAuth.id !== id_empleado) {
      res.status(400).json({
        error: `solo puede actulizar tu propio usuario, tu id es ${usuarioAuth?.id}`,
      });
      return;
    }

    const {
      email,
      password,
      role,
      name_empleado,
      appaterno,
      appmaterno,
      telefono,
    } = req.body;
    const updateuser = await usersModels.update(id_empleado, {
      email,
      password,
      role,
      name_empleado,
      appaterno,
      appmaterno,
      telefono,
    });
    res.status(200).json({ data: updateuser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "error al actualizar la informacion del empleado" });
  }
};
