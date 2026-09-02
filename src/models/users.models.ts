import type { role } from "../../prisma/generated/prisma/enums";
import prisma from "../config/prisma";

export const usersModels = {
  findall: async () => {
    return await prisma.users.findMany({
      orderBy: { id_empleado: "asc" },
    });
  },

  findfilterespecialidad: async (especiadadNombre: string) => {
    return await prisma.users.findMany({
      where: {
        role: "MEDICO",
        especialidades: {
          name_especialidad: especiadadNombre,
        },
      },
      select: {
        name_empleado: true,
        appaterno: true,
        appmaterno: true,
        email: true,
        especialidades: {
          select: {
            name_especialidad: true,
          },
        },
        telefono: true,
      },
    });
  },

  create: async (
    name_empleado: string,
    appaterno: string,
    appmaterno: string,
    email: string,
    id_especialidad: number,
    password: string,
    role: role,
    telefono: string,
  ) => {
    return await prisma.users.create({
      data: {
        name_empleado,
        appaterno,
        appmaterno,
        email,
        id_especialidad,
        password,
        role,
        telefono,
      },
    });
  },
};
