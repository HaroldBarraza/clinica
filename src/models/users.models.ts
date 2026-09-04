import type { role } from "../../prisma/generated/prisma/client";
import prisma from "../config/prisma";
import { Prisma } from "../../prisma/generated/prisma/client";

export const usersModels = {
  findall: async () => {
    return await prisma.users.findMany({
      omit: {
        password: true,
      },
    });
  },

  findfilterespecialidad: async (especiadadNombre: string) => {
    return await prisma.users.findMany({
      where: {
        role: "MEDICO",
        especialidades: {
          name_especialidad: {
            equals: especiadadNombre,
            mode: "insensitive",
          },
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
  update: async (
    id_empleado: number,
    data: Partial<Omit<Prisma.usersCreateInput, "id_empleado">>,
  ) => {
    return await prisma.users.update({
      where: { id_empleado },
      data,
    });
  },
    findbyIdUsers: async (id: number) => {
    return await prisma.users.findFirst({
      where: {
        id_empleado: id,
      },
    });
  },

};
