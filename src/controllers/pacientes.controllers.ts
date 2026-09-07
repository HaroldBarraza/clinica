import type { Request, Response } from "express";
import { pacienteModels } from "../models/pacientes.models";

export const allpacientes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Pacientes']
#swagger.summary = 'Obtener todos los pacientes'
*/

  try {
    const resultado = await pacienteModels.findall();
    res.json({ datos: resultado });
  } catch (error) {
    res.status(500).json({ error: "error al obtener todos los pacientes" });
  }
};
export const findbyid = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Pacientes']
#swagger.summary = 'obtener Pacient por id'
#swagger.parameters['id'] = {
in: 'path',
description: 'ID del paciente',
required: true,
type: 'integer'
}

*/

  try {
    const id = Number(req.params.id);
    const resultado = await pacienteModels.findbyId(id);
    if(!resultado){
      res.status(400).json({error: "el paciente con este id no existe"})
      return
    }
    res.status(201).json({ data: resultado });
  } catch (error) {
    res.status(500).json({ error: "error al obtener todos los pacientes" });
  }
};
export const createpacientes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Pacientes']
#swagger.summary = 'Crear nuevo paciente'
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
            name_paciente:{type: 'string', example: 'Valeria' },
            appaterno_paciente:{type: 'string', example: 'Paredes' },
            apmaterno_paciente:{type: 'string', example: 'Rodriguez' },
            email:{type: 'string', example: 'example@example.com' },
            telefono:{type: 'string', example: '987654321' },
            fecha_nacimiento:{type: 'date', example: '2000-12-20' },
            genero:{type: 'string', example: 'FEMENINO' }
        },
        required: ['name_paciente', 'appaterno_paciente', 'apmaterno_paciente', 'email', 'telefono', 'fecha_nacimiento', 'genero']
      }
    }
  }
}

*/

  try {
    const {
      name_paciente,
      appaterno_paciente,
      apmaterno_paciente,
      email,
      telefono,
      fecha_nacimiento,
      genero,
    } = req.body;
    if (
      !name_paciente ||
      !appaterno_paciente ||
      !apmaterno_paciente ||
      !email ||
      !telefono ||
      !fecha_nacimiento ||
      !genero
    )
      res.status(400).json({ error: "todo los campos son requeridos" });
    const resultado = await pacienteModels.create_paciente(
      name_paciente,
      appaterno_paciente,
      apmaterno_paciente,
      email,
      telefono,
      fecha_nacimiento,
      genero,
    );
    res.status(200).json({ data: resultado });
  } catch (error) {
    res.status(500).json({ message: "error al crear paciente" });
  }
};

export const updatepaciente = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* #swagger.tags = ['Pacientes']
#swagger.summary = 'Actualizar datos de un paciente (todos los campos opcionales)'
#swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del paciente a actualizar',
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
          name_paciente: { type: 'string', example: 'María' },
          appaterno_paciente: { type: 'string', example: 'López' },
          apmaterno_paciente: { type: 'string', example: 'García' },
          email: { type: 'string', example: 'maria@email.com' },
          telefono: { type: 'string', example: '987654321' },
          fecha_nacimiento: { type: 'string', format: 'date', example: '1995-05-15' },
          genero: { type: 'string', enum: ['MASCULINO', 'FEMENINO'], example: 'FEMENINO' }
        }
      }
    }
  }
} */

  try {
    const id_paciente = Number(req.params.id);
    if (isNaN(id_paciente)) {
      res.status(400).json({ error: "el id tiene qu se un numero valido" });
      return;
    }
    const resultado = await pacienteModels.findbyId(id_paciente);
    if(resultado?.id_paciente === undefined){
      res.status(400).json({error: "el paciente con ese id no esixte"})
      return
    }

    const {
      name_paciente,
      appaterno_paciente,
      apmaterno_paciente,
      email,
      telefono,
      fecha_nacimiento,
      genero,
    } = req.body;
    const updatepaciente = await pacienteModels.updatepaciente(id_paciente, {
      name_paciente,
      appaterno_paciente,
      apmaterno_paciente,
      email,
      telefono,
      fecha_nacimiento,
      genero,
    });
    res.status(200).json({ data: updatepaciente });
  } catch (error) {
    res
      .status(500)
      .json({ error: "error al actualizar la informacion del pasciente" });
  }
};


export const getPacienteCitas = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Pacientes']
  #swagger.summary = 'Obtener todas las citas de un paciente'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del paciente',
    required: true,
    type: 'integer',
    example: 1
  }
  */

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número válido." });
      return;
    }

    const pacienteConCitas = await pacienteModels.findWithCitas(id);

    if (!pacienteConCitas) {
      res.status(404).json({ error: `Paciente con ID ${id} no encontrado.` });
      return;
    }

    if (pacienteConCitas.citas.length === 0) {
      res.status(200).json({
        message: `El paciente "${pacienteConCitas.name_paciente} ${pacienteConCitas.appaterno_paciente}" no tiene citas registradas.`,
        data: pacienteConCitas
      });
      return;
    }

    res.status(200).json({ data: pacienteConCitas });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas del paciente." });
  }
};