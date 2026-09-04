import type { Request, Response } from "express";
import { usersModels } from "../models/users.models";
import { error } from "node:console";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await usersModels.findall();
    res.json({ data: resultado });
  } catch (error_any) {
    res.status(500).json({ error: "hubo un error con la bases" });
  }
};
export const getmedicosbyestado = async (req: Request, res: Response): Promise<void> => {
  const especialidad = req.params.estado;
  try {
    if (!especialidad || typeof especialidad !== "string") {
      res.status(400).json({ error: "hubo un error" });
    } else {
      const resultado = await usersModels.findfilterespecialidad(especialidad);
      res.json({data: resultado})
    } 
  } catch (error) {}
};

export const createuser = async(req:Request, res:Response): Promise<void> => {
    try {
       const {name_empleado, appaterno, appmaterno, email,id_especialidad, password, role, telefono} = req.body 
       if(!name_empleado || !appaterno || !appmaterno || !email || !password || !role || !telefono ){
         res.status(400).json({error: "los campos son obligatorios"})
       }
       const resultado = await usersModels.create(
        name_empleado,
        appaterno,
        appmaterno,
        email,
        id_especialidad || null,
        password,
        role,
        telefono
       )
       res.status(204).json({data: resultado})
    } catch (error:any) {
        res.status(500).json({message: error})
    }
}
