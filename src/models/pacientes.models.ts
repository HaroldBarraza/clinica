import type { genero } from "../../prisma/generated/prisma/client";
import prisma from "../config/prisma";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Prisma } from "../../prisma/generated/prisma/client";

const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy", { locale: es });
};
const formatTime = (time: Date | string | null): string | null => {
  if (!time) return null;
  return format(new Date(time), "HH:mm", { locale: es });
};

export const pacienteModels = {
  findall: async () => {
    const paciente = await prisma.pacientes.findMany({
      orderBy: { id_paciente: "asc" },
    });
    return paciente.map((paciente) => ({
      ...paciente,
      fecha_nacimiento: formatDate(paciente.fecha_nacimiento),
      fecha_registro: formatDate(paciente.fecha_registro),
    }));
  },
  create_paciente: async (
    name_paciente: string,
    appaterno_paciente: string,
    apmaterno_paciente: string,
    email: string,
    telefono: string,
    fecha_nacimiento: Date,
    genero: genero,
  ) => {
    const paciente = await prisma.pacientes.create({
      data: {
        name_paciente,
        appaterno_paciente,
        apmaterno_paciente,
        email,
        telefono,
        fecha_nacimiento,
        genero,
      },
    });
    return {
      ...paciente,
      fecha_nacimiento: formatDate(paciente.fecha_nacimiento),
    };
  },
  findbyId: async (id: number) => {
    return await prisma.pacientes.findFirst({
      where: {
        id_paciente: id,
      },
    });
  },
  updatepaciente: async (
    id_paciente: number,
    data: Partial<Omit<Prisma.pacientesCreateInput, "id_paciente">>,
  ) => {
    return await prisma.pacientes.update({
      where: { id_paciente },
      data,
    });
  },

  findWithCitas: async (id: number) => {
    const paciente = await prisma.pacientes.findUnique({
      where: { id_paciente: id },
      include: {
        citas: {
          orderBy: { fecha_de_cita: "desc" },
          include: {
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
            estado: {
              select: {
                name_estado: true,
              },
            },
            users: {
              select: {
                name_empleado: true,
                appaterno: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!paciente) return null;

    const citasFormateadas = paciente.citas.map((cita) => ({
      ...cita,
      fecha_de_cita: formatDate(cita.fecha_de_cita),
      hora_de_cita: formatTime(cita.hora_de_cita),
      fecha_creacion: formatDate(cita.fecha_creacion),
    }));

    return {
      ...paciente,
      fecha_nacimiento: formatDate(paciente.fecha_nacimiento),
      fecha_registro: formatDate(paciente.fecha_registro),
      citas: citasFormateadas,
    };
  },
};

