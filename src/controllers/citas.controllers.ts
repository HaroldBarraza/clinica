import type { Request, Response } from "express";
import { citasModels } from "../models/citas.models";

export const getall = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Citas']
#swagger.summary = 'Obtiene todas las citas'

*/
  try {
    const resultado = await citasModels.findall();
    res.json({ datos: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "ocurrio un error al obtener todos las citas" });
  }
};

export const filterdocto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Citas']
#swagger.summary = 'Filtra las citas de un doctor'
#swagger.parameter['fecha_inicio'] = {
in:'query',
description: 'Fecha de inicio (formato YYYY-MM-DD)',
required: true,
type: 'string',
example: '2026-12-21'
}
#swagger.parameter['fecha_final'] = {
in: 'query',
description: 'Fecha final (formato YYYY-MM-DD)',
required: true,
type: 'string',
example: '2026-12-30'
}

*/
  try {
    //obetener fecha de medico para mostrarle las citas del doctor
    const { fecha_inicio, fecha_final } = req.query;
    const id_empleado = req.user?.id;
    if (!fecha_inicio || !fecha_final) {
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
    if (fechainicio > fechafinal) {
      res.status(400).json({
        error: "la fecha inicial tiene que ser menor a la fecha final ",
      });
      return;
    }
    const resultado = await citasModels.filterwithdoctor(
      id_empleado!,
      fechainicio,
      fechafinal,
    );
    res.json({ data: resultado });
  } catch (error) {
    res.status(500).json({ message: "error al filtrar por doctor" });
  }
};

export const filterforboss = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Citas']
#swagger.summary = 'Filtra segun la especialidad'


*/
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
  } catch (error) {
    res.status(500).json({ message: "error al filtrar los datos" });
  }
};

export const filtrarestado = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Citas']
#swagger.summary = 'Filtra citas Canceladas y Completas por dia'


*/

  try {
    const fecha_inicio = req.query.fecha;
    if (!fecha_inicio) {
      res.status(400).json({ error: "todos los parametros son necesarios" });
      return;
    }
    const fechainicio = new Date(fecha_inicio as string);
    if (isNaN(fechainicio.getTime())) {
      res
        .status(400)
        .json({ error: "el formato la hora es invalido YYYY-MM-DD" });
    }
    const resultado = await citasModels.filtrarcitasestado(fechainicio);
    res.json({ data: resultado });
  } catch (error) {
    res.status(500).json({ message: "erro al filtrar por estado" });
  }
};

export const createCita = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Citas']
#swagger.summary = 'Crear una cita'
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id_paciente: { type: 'number', example: '1' },
          id_medico: { type: 'number', example: '1' },
          fecha_de_cita: { type: 'date', example: '2026-10-30' },
          hora_de_cita: {type: 'time', example: '13:00'},
          descripcion: { type: 'string', example: 'Presento dolor de cabeza' },
          creado_por: { type: 'number', example: '1' }
        },
        required: ['id_paciente', 'id_medico', 'fecha', 'hora', 'descripcion', 'creado_por']
      }
    }
  }
}

*/
  try {
    const { fecha_de_cita, hora_de_cita, id_medico, id_paciente, descripcion } =
      req.body;
    if (
      !fecha_de_cita ||
      !hora_de_cita ||
      !id_medico ||
      !id_paciente ||
      !descripcion
    ) {
      res.status(400).json({ error: "todos los campos son necesarios" });
      return;
    }
    const creado_por = req.user!.id;
    const resultado = await citasModels.create_cita(
      creado_por,
      fecha_de_cita,
      hora_de_cita,
      id_medico,
      id_paciente,
      descripcion,
    );
    res.status(202).json({ data: resultado });
  } catch (error) {
    res.status(500).json({ message: "error al crear la cita" });
  }
};
export const updateestado = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Actualizar el estado de una cita'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID de la cita',
    required: true,
    type: 'integer'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            estado: { type: 'integer', example: 2 }
          },
          required: ['estado']
        }
      }
    }
  }
  */

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "el di tiene que ser un numero" });
      return;
    }
    const resultado = await citasModels.findbyIdCitas(id);
    if (resultado?.id_cita === undefined) {
      res.status(400).json({ error: "la cita con ese id no existe" });
      return;
    }
    const {estado} = req.body
    console.log(`esste es e estado ${estado}, este es el id ${id}`);
    const citaActualizada = await citasModels.updateestado(id, estado);
    res.json({ data: citaActualizada });
  } catch (error) {
    res.status(500).json({ message: "error al actualizar el estado" });
  }
};

export const filtrosestadoresporte = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /*   
#swagger.tags = ['urgente']

 */ try {
    const { fecha_inicio, fecha_final } = req.query;
    if (!fecha_inicio || !fecha_final) {
      res.status(400).json({ error: "se requier un fecha de inicio y final" });
      return;
    }
    const inicio = new Date(fecha_inicio as string);
    const final = new Date(fecha_final as string);
    if (isNaN(inicio.getTime()) || isNaN(final.getTime())) {
      res
        .status(400)
        .json({ error: "formato de fecha invalido utlize YYYY/MM/DD" });
      return;
    }
    if (inicio > final) {
      res.status(400).json({
        error: "la fecha de inicio tiene que ser menor a la fecha final",
      });
      return;
    }

    const resultado = await citasModels.filtrarporespecialidad(inicio, final);
    res.json({ data: resultado });
  } catch (error) {
    res.status(500).json({ message: "error al filtrar por estado" });
  }
};
