import type { genero } from "../../prisma/generated/prisma/enums";
import prisma from "../config/prisma";

export const pacienteModels = {
  findall: async () => {
    return await prisma.pacientes.findMany({
      orderBy: { id_paciente: "asc" },
    });
  },
  create_paciente: async (
    name_paciente: string,
    appaterno_paciente: string,
    apmaterno_paciente: string,
    email: string,
    telefono:string,
    fecha_nacimiento: Date,
    genero: genero,
  ) => {
    return await prisma.pacientes.create({
        data:{
            name_paciente,
            appaterno_paciente,
            apmaterno_paciente,
            email,
            telefono,
            fecha_nacimiento,
            genero
        }
    });
  },
  findbyId: async(id: number) => {
    return await prisma.pacientes.findFirst({
      where:{
        id_paciente: id
      }
    })
  } 
};
