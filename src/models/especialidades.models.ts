import { create } from "node:domain";
import prisma from "../config/prisma";

export const especialidadModels = {
  findall: async () => {
    return await prisma.especialidades.findMany({
      orderBy: { id_especialidad: "asc" },
    });
  },
  create_especialidad: async (
    name_especialidad: string,
    descripcion_especialidad: string,
  ) => {
    return await prisma.especialidades.create({
      data: {
        name_especialidad,
        descripcion_especialidad,
      },
    });
  },
};
