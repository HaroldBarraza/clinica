import { create } from "node:domain";
import prisma from "../config/prisma";

export const estado_citaModels = {
    findall: async() => {
        return await prisma.estado_citas.findMany({
            orderBy: {id_estado: "asc"}
        })
    },
    
    
}