import prisma  from "../config/prisma";

export const usersModels = {
    findall: async() => {
        return await prisma.users.findMany({
            orderBy: {id_empleado: "asc"}
        })
    }
}