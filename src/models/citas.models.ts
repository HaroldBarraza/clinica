import { create } from "node:domain";
import prisma from "../config/prisma";
import { estado } from "../../prisma/generated/prisma/enums";

export const citasModels = {
  findall: async () => {
    return await prisma.citas.findMany({
      orderBy: { id_cita: "asc" },
    });
  },
  filterwithdoctor: async (
    medico_name: string,
    fecha_inicio: Date,
    fecha_final: Date,
  ) => {
    return await prisma.citas.findMany({
      where: {
        medico: {
          name_empleado: medico_name,
        },
        fecha_hora: {
          gte: fecha_inicio,
          lte: fecha_final,
        },
      },
      select: {
        fecha_hora: true,
        estado: {
          select: {
            name_estado: true,
          },
        },
        pacientes: {
          select: {
            name_paciente: true,
            appaterno_paciente: true,
            fecha_nacimiento: true,
            genero: true,
            telefono: true,
          },
        },
        descripcion: true,
      },
    });
  },

  filterforboss: async (especialidad: string, fecha_inicio: Date) => {
    const fechaInicio = new Date(fecha_inicio);
    fechaInicio.setHours(0, 0, 0, 0);

    const fechaFinal = new Date(fecha_inicio);
    fechaFinal.setHours(23, 59, 59);
    return await prisma.citas.findMany({
      where: {
        medico: {
          especialidades: {
            name_especialidad: especialidad,
          },
        },
        fecha_hora: {
          gte: fechaInicio,
          lte: fechaFinal,
        },
      },
      select: {
        medico: {
          select: {
            name_empleado: true,
            appaterno: true,
            especialidades: {
              select: {
                name_especialidad: true,
              },
            },
          },
        },
        fecha_hora: true,
        pacientes: {
          select: {
            name_paciente: true,
            appaterno_paciente: true,
          },
        },
        estado: true,
      },
    });
  },
  filtrarcitasestado: async (fecha_actual: Date) => {
    const hora_inicio = new Date(fecha_actual);
    hora_inicio.setHours(0, 0, 0, 0);
    const hora_final = new Date(fecha_actual);
    hora_final.setHours(23, 59, 59);
    const total_completado = await prisma.citas.count({
      where: {
        fecha_hora: {
          gte: hora_inicio,
          lte: hora_final,
        },
        estado: { name_estado: "COMPLETADA" },
      },
    });
    const total_cancelada = await prisma.citas.count({
      where: {
        fecha_hora: {
          gte: hora_inicio,
          lte: hora_final,
        },
        estado: {
          name_estado: "CANCELADA",
        },
      },
    });
    return {
      fecha: fecha_actual.toISOString().split("T")[0],
      completado: total_completado,
      cancelado: total_cancelada,
      total: total_cancelada + total_completado,
    };
  },

  create_cita: async (
    creado_por: number,
    fecha_hora: Date,
    id_estado: number,
    id_medico: number,
    id_paciente: number,
    descripcion: string,
  ) => {
    return await prisma.citas.create({
      data: {
        creado_por,
        fecha_hora,
        id_estado,
        id_medico,
        id_paciente,
        descripcion,
      },
    });
  },
  updateestado: async (id: number, estado: number) => {
    return await prisma.citas.update({where:{id_cita: id}, data:{id_estado:estado}})
  },
};
