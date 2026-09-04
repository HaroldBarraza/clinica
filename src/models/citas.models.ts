import prisma from "../config/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy", { locale: es });
};

const formatTime = (time: Date | string | null): string | null => {
  if (!time) return null;
  return format(new Date(time), "HH:mm", { locale: es });
};

export const citasModels = {
  findall: async () => {
    const datos = await prisma.citas.findMany({
      orderBy: { id_cita: "asc" },
      include: {
        pacientes:{
          select:{
            name_paciente:true,
            appaterno_paciente: true,
            apmaterno_paciente:true,
            genero: true,
            fecha_nacimiento:true,
          }
        },
        estado: {
          select:{
            name_estado:true
          }
        },
        medico:{
          select:{
            name_empleado: true,
            appaterno: true,
            especialidades:true,
          }
        },
        users:{
          select:{
            name_empleado: true,
            appaterno: true,
            role: true
          }
        }
      },
      
    });
    return datos.map((cita) => ({
      ...cita,
      fecha_de_cita: formatDate(cita.fecha_de_cita),
      hora_de_cita: formatTime(cita.hora_de_cita),
    }));
  },
  filterwithdoctor: async (
    id_empleado: number,
    fecha_inicio: Date,
    fecha_final: Date,
  ) => {

    const datos = await prisma.citas.findMany({
      where: {
        medico: {
          id_empleado: id_empleado,
        },
        fecha_de_cita: {
          gte: fecha_inicio,
          lte: fecha_final,
        },
      },
      select: {
        fecha_de_cita: true,
        hora_de_cita: true,
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
    return datos.map((cita) => ({
      ...cita,
      fecha_de_cita: formatDate(cita.fecha_de_cita),
      hora: formatTime(cita.hora_de_cita),
    }));
  },

  filterforboss: async (especialidad: string, fecha_inicio: Date) => {
    const fechaInicio = new Date(fecha_inicio);
    fechaInicio.setHours(0, 0, 0, 0);

    const fechaFinal = new Date(fecha_inicio);
    fechaFinal.setHours(23, 59, 59);
    const datos = await prisma.citas.findMany({
      where: {
        medico: {
          especialidades: {
            name_especialidad: {
              equals: especialidad,
              mode: "insensitive"
            },
          },
        },
        fecha_de_cita: {
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
        fecha_de_cita: true,
        hora_de_cita: true,
        pacientes: {
          select: {
            name_paciente: true,
            appaterno_paciente: true,
          },
        },
        estado: true,
      },
    });
    return datos.map((cita) => ({
      ...cita,
      fecha_de_cita: formatDate(cita.fecha_de_cita),
      hora: formatTime(cita.hora_de_cita),
    }));
  },
  filtrarcitasestado: async (fecha_actual: Date) => {
    const hora_inicio = new Date(fecha_actual);
    hora_inicio.setHours(0, 0, 0, 0);
    const hora_final = new Date(fecha_actual);
    hora_final.setHours(23, 59, 59);
    const total_completado = await prisma.citas.count({
      where: {
        fecha_de_cita: {
          gte: hora_inicio,
          lte: hora_final,
        },
        estado: { name_estado: "COMPLETADA" },
      },
    });
    const total_cancelada = await prisma.citas.count({
      where: {
        fecha_de_cita: {
          gte: hora_inicio,
          lte: hora_final,
        },
        estado: {
          name_estado: "CANCELADA",
        },
      },
    });
    return {
      fecha_de_cita: formatDate(fecha_actual),
      completado: total_completado,
      cancelado: total_cancelada,
      total: total_cancelada + total_completado,
    };
  },

  create_cita: async (
    creado_por: number,
    fecha_de_cita: Date,
    hora_de_cita: Date,
    id_medico: number,
    id_paciente: number,
    descripcion: string,
  ) => {
    const datos = await prisma.citas.create({
      data: {
        creado_por,
        fecha_de_cita,
        hora_de_cita,
        id_medico,
        id_paciente,
        descripcion,
        id_estado: 1,
      },
    });
    return {
      ...datos,
      fecha_de_cita: formatDate(datos.fecha_de_cita),
      hora: formatTime(datos.hora_de_cita),
    };
  },
  updateestado: async (id: number, estado: number) => {
    return await prisma.citas.update({
      where: { id_cita: id },
      data: { id_estado: estado },
    });
  },
  filtrarporespecialidad: async (fecha_inicio: Date, fecha_final: Date) => {
    const fechaInicio = new Date(fecha_inicio);
    fechaInicio.setHours(0, 0, 0, 0);

    const fechaFinal = new Date(fecha_final);
    fechaFinal.setHours(23, 59, 59);

    const resultado = await prisma.$queryRaw<
      Array<{ especialidad: string; total: bigint }>
    >`SELECT e.name_especialidad AS especialidad,
  COUNT(c.id_cita) AS total
  FROM citas c
  JOIN users u ON c.id_medico = u.id_empleado
  JOIN especialidades e ON u.id_especialidad = e.id_especialidad
  WHERE c.fecha_de_cita BETWEEN ${fechaInicio} AND ${fechaFinal}
  GROUP BY e.name_especialidad
  ORDER BY total DESC
  `;
    return resultado.map((row) => ({
      especialidad: row.especialidad,
      total: Number(row.total),
    }));
  },
    findbyIdCitas: async (id: number) => {
    return await prisma.citas.findFirst({
      where: {
        id_cita: id,
      },
    });
  },
};
