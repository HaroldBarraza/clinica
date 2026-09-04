import type { genero } from "../../prisma/generated/prisma/client";
import prisma from "../config/prisma";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Prisma } from "../../prisma/generated/prisma/client";

const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy", { locale: es });
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
};
